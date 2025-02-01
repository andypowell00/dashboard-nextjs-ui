import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST() {
  try {
    revalidateTag('items-cache'); //Clears the cache, this is a fix for vercel not auto-revalidating unstable cache tags 
    console.warn("Cache reset triggered at:", new Date().toISOString());

    return NextResponse.json({ message: "Cache has been reset." });
  } catch (error: unknown) {
    console.error("Error resetting cache:", error);
    return NextResponse.json(
      { error: "Failed to reset cache." },
      { status: 500 }
    );
  }
}
