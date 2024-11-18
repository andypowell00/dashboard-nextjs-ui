// src/app/api/items/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10); // Get today's date (yyyy-mm-dd)

    // Establish a connection to the MongoDB-based Cosmos DB
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COSMOS_DB_CONTAINER_NAME as string);

    // Fetch all items from the specified collection where date matches today's date
    const items = await collection.find({ date: { $eq: today } }).toArray();

    //console.log(items);

    
    // Return the fetched items
    return NextResponse.json(items);
  } catch (error: unknown) {


    // Return a response with a 500 status and detailed error message
    return NextResponse.json(
      { error: 'Failed to fetch items', details: error },
      { status: 500 }
    );
  }
}
