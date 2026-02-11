import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

const DATABASE_UNAVAILABLE_ERROR_CODES = new Set(['P1001', 'P1002']);

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientInitializationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientInitializationError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isKnownRequestError =
      exception instanceof Prisma.PrismaClientKnownRequestError;

    const isDatabaseUnavailable =
      (isKnownRequestError && DATABASE_UNAVAILABLE_ERROR_CODES.has(exception.code)) ||
      exception.message.includes("Can't reach database server");

    if (!isDatabaseUnavailable) {
      this.logger.error('Unhandled Prisma exception.', exception.stack);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
      return;
    }

    this.logger.error('Database is unavailable for Prisma query.', exception.message);

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'Database is temporarily unavailable. Please try again shortly.',
    });
  }
}
