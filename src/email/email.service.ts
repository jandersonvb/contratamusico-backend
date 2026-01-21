import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    // Configuração do transporter usando variáveis de ambiente
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Envia email de recuperação de senha
   */
  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
    firstName: string,
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/recuperar-senha?token=${resetToken}`;

    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Recuperação de Senha - ContrataMúsico',
      html: this.getPasswordResetTemplate(firstName, resetUrl),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de recuperação enviado para: ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}:`, error);
      throw new Error('Erro ao enviar e-mail de recuperação.');
    }
  }

  /**
   * Envia email de boas-vindas
   */
  async sendWelcomeEmail(
    email: string,
    firstName: string,
    userType: 'CLIENT' | 'MUSICIAN',
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Bem-vindo ao ContrataMúsico! 🎵',
      html: this.getWelcomeTemplate(firstName, userType),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de boas-vindas enviado para: ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}:`, error);
    }
  }

  /**
   * Envia notificação de novo booking (para músico)
   */
  async sendBookingNotification(
    musicianEmail: string,
    musicianName: string,
    clientName: string,
    eventType: string,
    eventDate: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: musicianEmail,
      subject: 'Nova Solicitação de Contratação! 🎤',
      html: this.getBookingNotificationTemplate(musicianName, clientName, eventType, eventDate),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Notificação de booking enviada para: ${musicianEmail}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar notificação para ${musicianEmail}:`, error);
    }
  }

  /**
   * Envia notificação de nova mensagem
   */
  async sendNewMessageNotification(
    recipientEmail: string,
    recipientName: string,
    senderName: string,
    messagePreview: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Nova Mensagem de ${senderName} 💬`,
      html: this.getNewMessageTemplate(recipientName, senderName, messagePreview),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Notificação de mensagem enviada para: ${recipientEmail}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar notificação para ${recipientEmail}:`, error);
    }
  }

  /**
   * Envia notificação de nova avaliação (para músico)
   */
  async sendReviewNotification(
    musicianEmail: string,
    musicianName: string,
    clientName: string,
    rating: number,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: musicianEmail,
      subject: 'Você Recebeu uma Nova Avaliação! ⭐',
      html: this.getReviewNotificationTemplate(musicianName, clientName, rating),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Notificação de avaliação enviada para: ${musicianEmail}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar notificação para ${musicianEmail}:`, error);
    }
  }

  /**
   * Template HTML para e-mail de recuperação de senha
   */
  private getPasswordResetTemplate(firstName: string, resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperação de Senha</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #6366f1;
            margin: 0;
          }
          .content {
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #6366f1;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .button:hover {
            background-color: #4f46e5;
          }
          .button-container {
            text-align: center;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎵 ContrataMúsico</h1>
          </div>
          
          <div class="content">
            <p>Olá, <strong>${firstName}</strong>!</p>
            
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no ContrataMúsico.</p>
            
            <p>Para criar uma nova senha, clique no botão abaixo:</p>
            
            <div class="button-container">
              <a href="${resetUrl}" class="button">Redefinir Senha</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Importante:</strong> Este link é válido por apenas <strong>1 hora</strong>. 
              Após esse período, você precisará solicitar uma nova recuperação de senha.
            </div>
            
            <p>Se você não solicitou a recuperação de senha, ignore este e-mail. Sua senha permanecerá inalterada.</p>
            
            <p>Por questões de segurança, nunca compartilhe este link com outras pessoas.</p>
          </div>
          
          <div class="footer">
            <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
            <p style="font-size: 12px; color: #999;">
              Se você está tendo problemas para clicar no botão, copie e cole o seguinte link no seu navegador:<br>
              <a href="${resetUrl}" style="color: #6366f1; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de boas-vindas
   */
  private getWelcomeTemplate(firstName: string, userType: 'CLIENT' | 'MUSICIAN'): string {
    const message = userType === 'MUSICIAN'
      ? 'Agora você pode criar seu perfil, adicionar fotos e vídeos ao seu portfólio e começar a receber contratações!'
      : 'Agora você pode buscar e contratar músicos incríveis para seus eventos!';

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">🎵 Bem-vindo ao ContrataMúsico!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${firstName}</strong>!</p>
          <p>Ficamos muito felizes em ter você conosco! 🎉</p>
          <p>${message}</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Acessar Plataforma</a>
          </p>
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de notificação de booking
   */
  private getBookingNotificationTemplate(
    musicianName: string,
    clientName: string,
    eventType: string,
    eventDate: string,
  ): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Solicitação</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">🎤 Nova Solicitação de Contratação!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${musicianName}</strong>!</p>
          <p>Você recebeu uma nova solicitação de contratação:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Cliente:</strong> ${clientName}</p>
            <p style="margin: 5px 0;"><strong>Tipo de Evento:</strong> ${eventType}</p>
            <p style="margin: 5px 0;"><strong>Data do Evento:</strong> ${eventDate}</p>
          </div>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard/bookings" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Solicitação</a>
          </p>
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de nova mensagem
   */
  private getNewMessageTemplate(
    recipientName: string,
    senderName: string,
    messagePreview: string,
  ): string {
    const preview = messagePreview.length > 100 
      ? messagePreview.substring(0, 100) + '...' 
      : messagePreview;

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">💬 Nova Mensagem!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${recipientName}</strong>!</p>
          <p>Você recebeu uma nova mensagem de <strong>${senderName}</strong>:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #6366f1;">
            <p style="margin: 0; font-style: italic;">"${preview}"</p>
          </div>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/messages" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Mensagem</a>
          </p>
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de nova avaliação
   */
  private getReviewNotificationTemplate(
    musicianName: string,
    clientName: string,
    rating: number,
  ): string {
    const stars = '⭐'.repeat(rating);

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Avaliação</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">⭐ Nova Avaliação!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${musicianName}</strong>!</p>
          <p>Você recebeu uma nova avaliação de <strong>${clientName}</strong>!</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="font-size: 32px; margin: 0;">${stars}</p>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">${rating} de 5 estrelas</p>
          </div>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/perfil" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Avaliação</a>
          </p>
          <p>Parabéns pelo ótimo trabalho! Continue assim! 🎉</p>
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  // ========================================
  // EMAILS DE PAGAMENTO
  // ========================================

  /**
   * Envia confirmação de pagamento/assinatura
   */
  async sendPaymentConfirmationEmail(
    email: string,
    firstName: string,
    planName: string,
    amount: number,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Pagamento Confirmado - ContrataMúsico 💳',
      html: this.getPaymentConfirmationTemplate(firstName, planName, amount),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de confirmação de pagamento enviado para: ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}:`, error);
    }
  }

  /**
   * Envia notificação de falha de pagamento
   */
  async sendPaymentFailedEmail(
    email: string,
    firstName: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Problema com seu Pagamento - ContrataMúsico ⚠️',
      html: this.getPaymentFailedTemplate(firstName),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de falha de pagamento enviado para: ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}:`, error);
    }
  }

  /**
   * Envia confirmação de cancelamento de assinatura
   */
  async sendSubscriptionCanceledEmail(
    email: string,
    firstName: string,
    accessUntil: Date,
  ): Promise<void> {
    const mailOptions = {
      from: `"ContrataMúsico" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Assinatura Cancelada - ContrataMúsico',
      html: this.getSubscriptionCanceledTemplate(firstName, accessUntil),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de cancelamento de assinatura enviado para: ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}:`, error);
    }
  }

  /**
   * Template de confirmação de pagamento
   */
  private getPaymentConfirmationTemplate(
    firstName: string,
    planName: string,
    amount: number,
  ): string {
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pagamento Confirmado</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">✅ Pagamento Confirmado!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${firstName}</strong>!</p>
          <p>Seu pagamento foi processado com sucesso! 🎉</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Plano:</strong> ${planName}</p>
            <p style="margin: 5px 0;"><strong>Valor:</strong> ${formattedAmount}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981;">Ativo</span></p>
          </div>
          
          <p>Agora você tem acesso a todos os recursos do seu plano. Aproveite ao máximo!</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/perfil" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Acessar Minha Conta</a>
          </p>
          
          <p style="font-size: 14px; color: #666;">
            Se você tiver alguma dúvida sobre sua assinatura, acesse o <a href="${process.env.FRONTEND_URL}/perfil/assinatura" style="color: #6366f1;">portal de assinaturas</a> ou entre em contato conosco.
          </p>
          
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de falha de pagamento
   */
  private getPaymentFailedTemplate(firstName: string): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Problema com Pagamento</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">⚠️ Problema com seu Pagamento</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${firstName}</strong>!</p>
          
          <p>Infelizmente, não conseguimos processar seu último pagamento.</p>
          
          <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>O que pode ter acontecido:</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Cartão expirado ou com limite insuficiente</li>
              <li>Dados do cartão desatualizados</li>
              <li>Problema temporário com o banco</li>
            </ul>
          </div>
          
          <p>Para evitar a suspensão do seu acesso, atualize seu método de pagamento:</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/perfil/assinatura" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Atualizar Pagamento</a>
          </p>
          
          <p style="font-size: 14px; color: #666;">
            Se você acredita que isso é um erro ou precisa de ajuda, entre em contato com nosso suporte.
          </p>
          
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Template de cancelamento de assinatura
   */
  private getSubscriptionCanceledTemplate(
    firstName: string,
    accessUntil: Date,
  ): string {
    const formattedDate = accessUntil.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assinatura Cancelada</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Assinatura Cancelada</h1>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Olá, <strong>${firstName}</strong>!</p>
          
          <p>Sua assinatura foi cancelada conforme solicitado.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 16px;">Você ainda tem acesso até:</p>
            <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: #6366f1;">${formattedDate}</p>
          </div>
          
          <p>Sentiremos sua falta! 😢</p>
          
          <p>Se mudar de ideia, você pode reativar sua assinatura a qualquer momento antes do fim do período:</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/planos" style="display: inline-block; padding: 12px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Planos</a>
          </p>
          
          <p style="font-size: 14px; color: #666;">
            Gostaríamos de saber o motivo do cancelamento para melhorar nosso serviço. Responda este e-mail com seu feedback!
          </p>
          
          <p>Atenciosamente,<br><strong>Equipe ContrataMúsico</strong></p>
        </div>
      </body>
      </html>
    `;
  }
}


