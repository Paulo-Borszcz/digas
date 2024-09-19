// src/app/api/getCount/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Counter from '../../../models/Counter';

export async function GET() {
  await dbConnect();

  const counter = await Counter.findOne({ name: 'luis' });

  return NextResponse.json({ count: counter ? counter.count : 0 });
}