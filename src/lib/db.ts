import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_DATABASE_NAME);
  }
  return db;
}
