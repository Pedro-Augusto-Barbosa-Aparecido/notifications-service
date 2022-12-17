import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-recipient-notification";
import { makeNotification } from "@test/factories/notification-factory";

describe("Count Recipient Notification", () => {
  it("should be able to count notifications", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toEqual(2);
  });
});
