import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MusicianModule } from './musician/musician.module';
import { GenreModule } from './genre/genre.module';
import { InstrumentModule } from './instrument/instrument.module';
import { LocationModule } from './location/location.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import { PlanModule } from './plan/plan.module';
import { FaqModule } from './faq/faq.module';
import { ContactModule } from './contact/contact.module';
import { UploadModule } from './upload/upload.module';
import { EmailModule } from './email/email.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ChatModule } from './chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 segundos
        limit: 10, // 10 requisições por minuto (padrão)
      },
    ]),
    PrismaModule,
    UploadModule,
    EmailModule,
    UserModule,
    AuthModule,
    MusicianModule,
    GenreModule,
    InstrumentModule,
    LocationModule,
    PortfolioModule,
    ReviewModule,
    BookingModule,
    PlanModule,
    FaqModule,
    ContactModule,
    FavoriteModule,
    ChatModule,
    PaymentModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
