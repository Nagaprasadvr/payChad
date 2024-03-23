import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_PROD_URI as string);
mongoose.Promise = global.Promise;

const ChadSchema = new Schema({
  id: {
    type: Number,
    required: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    required: true,
  },
  employeeCode: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pubkey: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Chad || mongoose.model("Chad", ChadSchema);
