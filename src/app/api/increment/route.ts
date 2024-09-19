// src/app/api/increment/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Counter from '../../../models/Counter';

export async function POST() {
  await dbConnect();

  const counter = await Counter.findOneAndUpdate(
    { name: 'luis' },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );

  return NextResponse.json({ count: counter.count });
}