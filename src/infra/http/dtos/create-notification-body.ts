import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationBody {
  @IsNotEmpty()
  @Length(5, 255)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  category: string;
}
