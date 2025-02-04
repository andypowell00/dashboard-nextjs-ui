import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { Item } from '@/app/types/item';

const CACHE_TIMER = Number(process.env.CACHE_TIMER) || 28880;

async function fetchItems(): Promise<Item[]> {
  console.warn(`[${new Date().toISOString()}] Fetching from DB...`);
  const db = await connectToDatabase();

  // Specify the type of documents in the collection with the generic.
  const collection = db.collection<Item>(process.env.DB_CONTAINER_NAME as string);
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Fetch weather and reddit items for today
  const weatherAndRedditItems = await collection.find({
    type: { $in: ['reddit', 'weather'] },
    date: todayString
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

  // Fetch latest 30 trailer items
  const trailerItems = await collection.find({ type: 'trailer' })
    .sort({ date: -1 })
    .limit(30)
    .toArray();

  // Combine all items into one array
  const allItems: Item[] = [
    ...weatherAndRedditItems,
    ...newsItems,
    ...musicItems,
    ...trailerItems
  ];

  return allItems;
}

const getCachedItems = unstable_cache(fetchItems, ['items-cache'], { revalidate: CACHE_TIMER });


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
