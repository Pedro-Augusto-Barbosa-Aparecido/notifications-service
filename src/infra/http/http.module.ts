import { CancelNotification } from "./../../application/useCases/cancel-notifications";
import { Module } from "@nestjs/common";
import { NotificationController } from "./controller/notifications.controller";
import { SendNotification } from "@application/useCases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { ReadNotification } from "@application/useCases/read-notification";
import { UnReadNotification } from "@application/useCases/unread-notification";
import { CountRecipientNotifications } from "@application/useCases/count-recipient-notification";
import { GetRecipientNotification } from "@application/useCases/get-recipient-notification";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnReadNotification,
    CountRecipientNotifications,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
