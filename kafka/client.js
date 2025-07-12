import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.0.194:9092"],
});

export default kafka;
