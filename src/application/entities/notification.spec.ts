import { randomUUID } from "node:crypto";

import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should be able to create a notificati", () => {
    const content = new Notification({
      content: new Content("Você recebeu uma solicitação de amizade"),
      category: "social",
      recipientId: randomUUID(),
    });

    expect(content).toBeTruthy();
  });
});
