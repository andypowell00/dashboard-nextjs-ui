import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Item } from '@/app/types/item';
import redis from '@/lib/redis'; 

const CACHE_TIMER = Number(process.env.CACHE_TIMER) || 28800; // Cache expiration in seconds

async function fetchItemsFromDB(): Promise<Item[]> {
  console.warn(`[${new Date().toISOString()}] Fetching from DB...`);
  const db = await connectToDatabase();

  const collection = db.collection<Item>(process.env.DB_CONTAINER_NAME as string);
  const today = new Date();
  const estOffset = -5 * 60; // EST offset in minutes
  const estDate = new Date(today.getTime() + estOffset * 60 * 1000);
  const todayString = estDate.toISOString().split('T')[0];

  // Fetch weather and reddit items for today
  const weatherItems = await collection.find({
    type: 'weather',
    date: todayString,
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
  return [...weatherItems, ...newsItems, ...musicItems, ...trailerItems];
}

// Check cache first, if not found, fetch from DB and cache
async function fetchItems(): Promise<Item[]> {
  const cacheKey = process.env.CACHE_KEY ?? 'all-items-cache';

  try {

    // Ensure Redis is connected
    if (!redis.isOpen) {
      await redis.connect();
    }
    
    // Try to get the cached data from Redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.warn(`[${new Date().toISOString()}] Fetching from Redis...`);
      return JSON.parse(cachedData);
    }

    // If no cache is found, fetch from DB and cache the result
    const items = await fetchItemsFromDB();
    await redis.setEx(cacheKey, CACHE_TIMER, JSON.stringify(items)); // Set cache with expiration

    return items;
  } catch (error) {
    console.error('Redis error:', error);
    return fetchItemsFromDB(); // Fallback to DB if Redis fails
  }
}

export async function GET() {
  try {
    const items = await fetchItems();
    return NextResponse.json(items);
  } catch (error: unknown) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
