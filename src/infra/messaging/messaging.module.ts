import { SendNotification } from "@application/useCases/send-notification";
import { NotificationController } from "./kafka/controllers/notification.controller";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [KafkaConsumerService, SendNotification],
})
export class MessagingModule {}
