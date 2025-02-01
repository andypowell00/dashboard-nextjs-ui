import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { unstable_cache } from 'next/cache';

async function fetchItems() {
  console.warn(`[${new Date().toISOString()}] Fetching from DB...`);
  const db = await connectToDatabase();
  const collection = db.collection(process.env.DB_CONTAINER_NAME as string);
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Fetch weather and reddit items
  const weatherAndRedditItems = await collection.find({
    type: { $in: ['reddit', 'weather'] },
    date: { $eq: todayString }
  }).toArray();

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

  // Fetch trailer items latest 30 trailers
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

const getCachedItems = unstable_cache(
  async () => {
    return await fetchItems();
  },
  ['items-cache'],
  { revalidate: 86400 } 
);

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

