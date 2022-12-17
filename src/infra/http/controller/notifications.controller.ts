import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { SendNotification } from "@application/useCases/send-notification";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CancelNotification } from "@application/useCases/cancel-notifications";
import { ReadNotification } from "@application/useCases/read-notification";
import { UnReadNotification } from "@application/useCases/unread-notification";
import { CountRecipientNotifications } from "@application/useCases/count-recipient-notification";
import { GetRecipientNotification } from "@application/useCases/get-recipient-notification";

@Controller("notifications")
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unReadNotification: UnReadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: GetRecipientNotification
  ) {}

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(
    @Param("recipientId") recipientId: string
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unReadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
