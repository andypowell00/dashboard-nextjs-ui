// src/app/api/items/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { parseStringDate, getCurrentMonthRegex } from '@/app/utils/dateParsing';

export async function GET() {
  try {
    
     // Establish a connection to the MongoDB-based Cosmos DB
     const db = await connectToDatabase();
     const collection = db.collection(process.env.COSMOS_DB_CONTAINER_NAME as string);
    
     const today = new Date();
     const currentMonth = today.getMonth();
     const currentYear = today.getFullYear();
 
     const items = await collection.find({
       $or: [
         // For reddit, weather, and news: exact date match
         {
           type: { $in: ['reddit', 'weather', 'news'] },
           date: { $eq: today.toISOString().split('T')[0] }
         },
         // For albums: release_date within this month and year
         {
           type: 'album',
           release_date: {
             $regex: getCurrentMonthRegex(currentMonth, currentYear)
           }
         },
         // For movies: date within this month and year
         {
           type: 'trailer',
           date: {
             $regex: `^${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`
           }
         }
       ]
     }).toArray();
 
     // Post-process to filter albums more accurately
     const filteredItems = items.filter(item => {
       if (item.type === 'album') {
         const date = parseStringDate(item.release_date);
         return date && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
       }
       return true;
     });
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
