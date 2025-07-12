import kafka from "./client.js";

async function init() {
  const admin = kafka.admin();

  console.log("Admin connecting ....");
  admin.connect();
  console.log("Admin connection success ....");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic created success .... [rider-updates]");
  
  console.log("Disconnect admin ....");
  await admin.disconnect();
}

init();
