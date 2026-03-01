import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

export interface UploadedFileResult {
  url: string;
  key: string;
}

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly endpointUrl?: string;

  // Tipos de arquivo permitidos
  private readonly allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  private readonly allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  private readonly allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  
  private readonly maxImageSize = 5 * 1024 * 1024; // 5MB
  private readonly maxVideoSize = 50 * 1024 * 1024; // 50MB
  private readonly maxAudioSize = 10 * 1024 * 1024; // 10MB

  constructor() {
    this.region = process.env.AWS_DEFAULT_REGION || 'us-east-1';
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || '';
    this.endpointUrl = process.env.AWS_ENDPOINT_URL?.trim() || undefined;
    const endpoint = this.endpointUrl;

    const clientConfig: any = {
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    };

    // Railway requer endpoint customizado e path-style URLs
    if (endpoint) {
      clientConfig.endpoint = endpoint;
      clientConfig.forcePathStyle = true;
    }

    this.s3Client = new S3Client(clientConfig);
  }

  private isHttpUrl(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }

  /**
   * Aceita tanto key pura (ex: avatars/1/file.jpg) quanto URL completa.
   */
  private resolveKey(keyOrUrl: string): string {
    if (!keyOrUrl) {
      throw new BadRequestException('Chave do arquivo não fornecida.');
    }

    if (!this.isHttpUrl(keyOrUrl)) {
      return keyOrUrl;
    }

    const extractedKey = this.extractKeyFromUrl(keyOrUrl);
    if (!extractedKey) {
      throw new BadRequestException(
        'Não foi possível extrair a chave do arquivo a partir da URL informada.',
      );
    }

    return extractedKey;
  }

  /**
   * Constrói URL "canônica" do arquivo (não assinada) para armazenamento.
   * A API continua gerando URL assinada na resposta.
   */
  buildFileUrl(key: string): string {
    if (!key) {
      throw new BadRequestException('Chave do arquivo não fornecida.');
    }

    const normalizedKey = key.replace(/^\/+/, '');

    if (this.endpointUrl) {
      const normalizedEndpoint = this.endpointUrl.replace(/\/+$/, '');
      return `${normalizedEndpoint}/${this.bucketName}/${normalizedKey}`;
    }

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${normalizedKey}`;
  }

  /**
   * Valida o arquivo antes do upload
   */
  validateFile(file: Express.Multer.File, type: 'image' | 'video' | 'audio' = 'image'): void {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    let allowedTypes: string[];
    let maxSize: number;

    switch (type) {
      case 'image':
        allowedTypes = this.allowedImageTypes;
        maxSize = this.maxImageSize;
        break;
      case 'video':
        allowedTypes = this.allowedVideoTypes;
        maxSize = this.maxVideoSize;
        break;
      case 'audio':
        allowedTypes = this.allowedAudioTypes;
        maxSize = this.maxAudioSize;
        break;
    }

    const normalizedMimeType = (file.mimetype || '').toLowerCase();

    if (!allowedTypes.includes(normalizedMimeType)) {
      throw new BadRequestException(
        `Tipo de arquivo não permitido (${file.mimetype || 'desconhecido'}). Use: ${allowedTypes.join(', ')}`,
      );
    }

    if (file.size > maxSize) {
      throw new BadRequestException(
        `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`,
      );
    }
  }

  /**
   * Detecta o tipo de arquivo baseado no mimetype
   */
  detectFileType(mimetype: string): 'IMAGE' | 'VIDEO' | 'AUDIO' {
    const normalizedMimeType = (mimetype || '').toLowerCase();
    if (this.allowedImageTypes.includes(normalizedMimeType)) return 'IMAGE';
    if (this.allowedVideoTypes.includes(normalizedMimeType)) return 'VIDEO';
    if (this.allowedAudioTypes.includes(normalizedMimeType)) return 'AUDIO';
    throw new BadRequestException('Tipo de arquivo não suportado');
  }

  /**
   * Faz upload de uma imagem de perfil para o S3
   */
  async uploadProfileImage(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UploadedFileResult> {
    this.validateFile(file, 'image');

    // Gerar nome único para o arquivo
    const fileExtension = file.originalname.split('.').pop() || 'jpg';
    const key = `avatars/${userId}/${randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    // Gerar URL assinada válida por 7 dias
    const url = await this.getSignedUrl(key);

    return { url, key };
  }

  /**
   * Faz upload de arquivo de portfólio (imagem, vídeo ou áudio) para o S3
   */
  async uploadPortfolioFile(
    file: Express.Multer.File,
    musicianId: number,
  ): Promise<UploadedFileResult & { type: 'IMAGE' | 'VIDEO' | 'AUDIO' }> {
    // Detectar tipo do arquivo
    const fileType = this.detectFileType(file.mimetype);
    
    // Validar arquivo baseado no tipo
    if (fileType === 'IMAGE') {
      this.validateFile(file, 'image');
    } else if (fileType === 'VIDEO') {
      this.validateFile(file, 'video');
    } else {
      this.validateFile(file, 'audio');
    }

    // Gerar nome único para o arquivo
    const fileExtension = file.originalname.split('.').pop() || 'bin';
    const folderName = fileType.toLowerCase();
    const key = `portfolio/${musicianId}/${folderName}/${randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    // Gerar URL assinada válida por 7 dias
    const url = await this.getSignedUrl(key);

    return { url, key, type: fileType };
  }

  /**
   * Faz upload de mídia para mensagens de chat (imagem, vídeo ou áudio)
   */
  async uploadChatMedia(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UploadedFileResult & { type: 'IMAGE' | 'VIDEO' | 'AUDIO' }> {
    const fileType = this.detectFileType(file.mimetype);

    if (fileType === 'IMAGE') {
      this.validateFile(file, 'image');
    } else if (fileType === 'VIDEO') {
      this.validateFile(file, 'video');
    } else {
      this.validateFile(file, 'audio');
    }

    const fileExtension = file.originalname.split('.').pop() || 'bin';
    const folderName = fileType.toLowerCase();
    const key = `chat/${userId}/${folderName}/${randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    const url = await this.getSignedUrl(key);

    return { url, key, type: fileType };
  }

  /**
   * Remove uma imagem do S3
   */
  async deleteFile(keyOrUrl: string): Promise<void> {
    if (!keyOrUrl) return;

    const key = this.resolveKey(keyOrUrl);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  /**
   * Extrai a key do S3 a partir de uma URL completa
   */
  extractKeyFromUrl(url: string): string | null {
    if (!url) return null;

    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      // Railway URLs: https://storage.railway.app/bucket-name/key
      // Remover a barra inicial e o nome do bucket
      const parts = pathname.substring(1).split('/');
      if (parts.length > 1 && parts[0] === this.bucketName) {
        return parts.slice(1).join('/');
      }
      
      // Fallback para formato AWS padrão
      return pathname.substring(1);
    } catch {
      return null;
    }
  }

  /**
   * Gera uma URL assinada (signed URL) para acesso temporário ao arquivo
   * @param key - Chave do arquivo no bucket
   * @param expiresIn - Tempo de expiração em segundos (padrão: 7 dias)
   * @returns URL assinada válida temporariamente
   */
  async getSignedUrl(keyOrUrl: string, expiresIn: number = 604800): Promise<string> {
    if (!keyOrUrl) {
      throw new BadRequestException('Chave do arquivo não fornecida.');
    }

    const key = this.resolveKey(keyOrUrl);

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
      return signedUrl;
    } catch (error) {
      throw new BadRequestException('Erro ao gerar URL assinada: ' + error.message);
    }
  }

  /**
   * Gera URLs assinadas para múltiplos arquivos
   * @param keys - Array de chaves dos arquivos
   * @param expiresIn - Tempo de expiração em segundos (padrão: 7 dias)
   * @returns Array de objetos com key e url assinada
   */
  async getSignedUrls(
    keys: string[],
    expiresIn: number = 604800,
  ): Promise<Array<{ key: string; url: string }>> {
    const urlPromises = keys.map(async (key) => ({
      key,
      url: await this.getSignedUrl(key, expiresIn),
    }));

    return Promise.all(urlPromises);
  }
}


