import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe("Cancel Notification", () => {
  it("should be able to cancel notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to cancel a non existing notification", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
