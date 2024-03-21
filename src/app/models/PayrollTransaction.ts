import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const PayrollTransactionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  txId: {
    type: String,
    required: true,
  },
  sentTo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  tokenName: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default mongoose.models.PayrollTransaction ||
  mongoose.model("PayrollTransaction", PayrollTransactionSchema);
