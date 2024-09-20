import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  word: String,
  reason: String,
  timestamp: Date
});

const CounterSchema = new mongoose.Schema({
  name: String,
  count: Number,
  bill: { type: Number, default: 0 },
  digaCount: { type: Number, default: 0 },
  papoRetoCount: { type: Number, default: 0 },
  words: [WordSchema]
});

export default mongoose.models.Counter || mongoose.model('Counter', CounterSchema);