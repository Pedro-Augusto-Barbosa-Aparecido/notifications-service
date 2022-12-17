import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { ReadNotification } from "./read-notification";

describe("Read Notification", () => {
  it("should be able to read notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to read a non existing notification", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
