import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { PrintersModule } from './printers/printers.module';
import { ServicesModule } from './services/services.module';
import { RequestsModule } from './requests/requests.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { MatchingModule } from './matching/matching.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { ProposalsModule } from './proposals/proposals.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BoostsModule } from './boosts/boosts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProvidersModule,
    PrintersModule,
    ServicesModule,
    RequestsModule,
    AttachmentsModule,
    MatchingModule,
    ConversationsModule,
    MessagesModule,
    ProposalsModule,
    OrdersModule,
    ReviewsModule,
    BoostsModule,
    NotificationsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
