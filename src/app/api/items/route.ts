import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

// Cache variables at module scope
let cachedItems: any[] | null = null;
let cachedAt: number = 0;

// Set cache duration to 24 hours (in milliseconds)
const CACHE_DURATION = 12 * 60 * 60 * 1000; 

async function fetchItems() {
  console.warn(`[${new Date().toISOString()}] Fetching from DB...`);
  const db = await connectToDatabase();
  const collection = db.collection(process.env.DB_CONTAINER_NAME as string);
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Fetch weather and reddit items
  const weatherAndRedditItems = await collection.find({
    type: { $in: ['reddit', 'weather'] },
    date: todayString
  }).toArray();

  // Log the count for debugging
  console.log("Weather & Reddit items count:", weatherAndRedditItems.length);

  // Fetch latest 25 news items
  const newsItems = await collection.find({ type: 'news' })
    .sort({ insertDate: -1 })
    .limit(25)
    .toArray();

  // Fetch latest 25 music items
  const musicItems = await collection.find({ type: 'music' })
    .sort({ insertDate: -1 }) 
    .limit(25)
    .toArray();

  // Fetch latest 30 trailer items
  const trailerItems = await collection.find({ type: 'trailer' })
    .sort({ date: -1 })
    .limit(30)
    .toArray();
  
  // Combine all items
  const allItems = [
    ...weatherAndRedditItems,
    ...newsItems,
    ...musicItems,
    ...trailerItems
  ];

  return allItems;
}

async function getCachedItems() {
  const now = Date.now();
  // Return cached items if they're still valid
  if (cachedItems && (now - cachedAt) < CACHE_DURATION) {
    console.log("Returning cached items.");
    return cachedItems;
  }
  
  console.log("Cache expired or not set; fetching new items.");
  const newItems = await fetchItems();
  cachedItems = newItems;
  cachedAt = now;
  return newItems;
}

export async function GET() {
  try {
    const items = await getCachedItems();
    return NextResponse.json(items);
  } catch (error: unknown) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
