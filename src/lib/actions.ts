'use server';

import dbConnect from './mongodb';
import Counter from '@/models/Counter';

export async function getInitialCount() {
  await dbConnect();
  const counter = await Counter.findOne({ name: 'luis' });
  return { 
    count: counter ? counter.count : 0, 
    bill: counter ? counter.bill : 0,
    wordCounts: counter ? { Diga: counter.digaCount, 'Papo Reto': counter.papoRetoCount } : { Diga: 0, 'Papo Reto': 0 }
  };
}

export async function getWordCounts() {
  await dbConnect();
  const counter = await Counter.findOne({ name: 'luis' });
  return counter ? { Diga: counter.digaCount, 'Papo Reto': counter.papoRetoCount } : { Diga: 0, 'Papo Reto': 0 };
}

export async function incrementCount(word: string, reason: string) {
  await dbConnect();
  const increment = word === 'Diga' ? 0.5 : 0.1;
  const updateField = word === 'Diga' ? 'digaCount' : 'papoRetoCount';
  
  const counter = await Counter.findOneAndUpdate(
    { name: 'luis' },
    { 
      $inc: { count: 1, bill: increment, [updateField]: 1 },
      $push: { 
        words: {
          word,
          reason,
          timestamp: new Date()
        }
      }
    },
    { upsert: true, new: true }
  );
  
  return { 
    count: counter.count, 
    bill: counter.bill,
    wordCounts: { Diga: counter.digaCount, 'Papo Reto': counter.papoRetoCount }
  };
}

export async function getWordHistory() {
  await dbConnect();
  const counter = await Counter.findOne({ name: 'luis' });
  return counter ? counter.words.sort((a : any, b : any) => b.timestamp - a.timestamp) : [];
}