// models/Counter.ts
import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

export default mongoose.models.Counter || mongoose.model('Counter', CounterSchema);