import kafka from "./client.js";
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  
  console.log("Connecting consumer ....");
  await consumer.connect();
  console.log("Consumer connected successfully ....");

  console.log("Subscribing to topic ....");
  await consumer.subscribe({
    topics: ["rider-updates"],
    fromBeginning: true,
  });
  console.log("Consumer subscribed to topic ....");
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
