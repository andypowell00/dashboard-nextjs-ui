import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('items-cache'); 
  return NextResponse.json({ message: 'Cache cleared!' });
}
