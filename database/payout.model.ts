
import { Schema, model, models } from 'mongoose';

const PayoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    accountEmail: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, default: Date.now },
    type : {
      type: String,
      enum: ['booking', 'referal'],
      required : true
    }

  },
  { timestamps: true }
);

const Payout = models.Payout || model('Payout', PayoutSchema);

export default Payout;