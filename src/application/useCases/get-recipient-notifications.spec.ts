import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotification } from "./get-recipient-notification";

describe("Get Recipient Notification", () => {
  it("should be able to get notifications", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new GetRecipientNotification(
      notificationRepository
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-2" })
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-1" })
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-1" })
    );

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient-1" }),
        expect.objectContaining({ recipientId: "recipient-1" }),
      ])
    );
  });
});
