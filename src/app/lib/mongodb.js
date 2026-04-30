import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "courseflow";

let client;
let clientPromise;

if (uri && process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else if (uri) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  if (!clientPromise) {
    throw new Error("Please add MONGODB_URI to your .env.local file.");
  }

  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export async function getUsersCollection() {
  const db = await getDb();
  const users = db.collection("users");

  await users.createIndex({ email: 1 }, { unique: true });

  return users;
}
