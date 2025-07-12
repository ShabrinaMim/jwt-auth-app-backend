import kafka from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer ....");
  await producer.connect();
  console.log("✅ Producer Connected Successfully");

  console.log("Enter rider name and location (e.g., 'mim north', or 'alex south')");
  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.trim().split(" ");
    if (!riderName || !location) {
      console.log("❌ Please enter both rider name and location ....");
      rl.prompt();
      return;
    }

    const partition = location.toLowerCase() === "north" ? 0 : 1;

    try {
      const result = await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition,
            key: "location-update",
            value: JSON.stringify({ name: riderName, location }),
          },
        ],
      });

      console.log(`✅ Message sent to partition ${partition}:`, result);
    } catch (err) {
      console.error("❌ Error sending message: ", err);
    }

    rl.prompt(); // <- this was missing in your version
  });

  rl.on("close", async () => {
    await producer.disconnect();
    console.log("🚪 Producer disconnected. Goodbye!");
    process.exit(0);
  });
}

init();
