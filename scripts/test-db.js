const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function test() {
  console.log(
    "Testing connection to:",
    uri ? uri.split("@")[1] || "uri-found-but-hidden" : "MISSING",
  );
  if (!uri) process.exit(1);

  try {
    console.time("connect");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.timeEnd("connect");
    console.log("Connected successfully");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(
      "Collections:",
      collections.map((c) => c.name),
    );

    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
