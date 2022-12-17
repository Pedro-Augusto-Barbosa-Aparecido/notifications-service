import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: "notifications",
        brokers: ["helpful-turtle-8205-us1-kafka.upstash.io:9092"],
        sasl: {
          mechanism: "scram-sha-256",
          username:
            "aGVscGZ1bC10dXJ0bGUtODIwNSQfoqHIsEX8NZ8RVSqE89rOeJcnyzdPS0XKGyo",
          password:
            "sgpeg6pDgc3N80RfhVeX4VA8oBXTkKQwT4okRKdO6CWIhfiF2xCU_UiKo_apnDDVHgNKag==",
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
