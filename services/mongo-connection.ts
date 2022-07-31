import { Db, MongoClient } from "mongodb";

// const { MONGODB_URI, MONGODB_DB } = process.env;

let uri: string = process.env.MONGODB_URI!;
let dbName: string = process.env.DB_NAME!;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}
// @TODO FIND EXACT PROMISE TYPE
export async function connectToDatabase(): Promise<any> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client: MongoClient = await MongoClient.connect(uri);

  const db: Db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  try {
    console.log(`Successfully connected to database: ${db.databaseName}`);
    return { client, db };
  } catch (error) {
    console.log("Connection error: " + error);
  }
}
