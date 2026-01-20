import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
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

  // Tipos de arquivo permitidos
  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private readonly allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  private readonly allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  
  private readonly maxImageSize = 5 * 1024 * 1024; // 5MB
  private readonly maxVideoSize = 50 * 1024 * 1024; // 50MB
  private readonly maxAudioSize = 10 * 1024 * 1024; // 10MB

  constructor() {
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.bucketName = process.env.AWS_S3_BUCKET || '';

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
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

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo não permitido. Use: ${allowedTypes.join(', ')}`,
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
    if (this.allowedImageTypes.includes(mimetype)) return 'IMAGE';
    if (this.allowedVideoTypes.includes(mimetype)) return 'VIDEO';
    if (this.allowedAudioTypes.includes(mimetype)) return 'AUDIO';
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
      // ACL público para que a imagem seja acessível via URL
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    // Construir URL pública do arquivo
    const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

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
      // ACL público para que o arquivo seja acessível via URL
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    // Construir URL pública do arquivo
    const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

    return { url, key, type: fileType };
  }

  /**
   * Remove uma imagem do S3
   */
  async deleteFile(key: string): Promise<void> {
    if (!key) return;

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
      // Remove a barra inicial do pathname
      return urlObj.pathname.substring(1);
    } catch {
      return null;
    }
  }
}



