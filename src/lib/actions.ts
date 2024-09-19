'use server';

import dbConnect from './mongodb';
import Counter from '@/models/Counter';

export async function getInitialCount() {
  await dbConnect();
  const counter = await Counter.findOne({ name: 'luis' });
  return counter ? counter.count : 0;
}

export async function incrementCount() {
  await dbConnect();
  const counter = await Counter.findOneAndUpdate(
    { name: 'luis' },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  return counter.count;
}