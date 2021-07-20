import mongoose from "mongoose";

const ResetSchema = new mongoose.Schema({
  pin: {
    type: String,
    maxLength: 6,
    minLength: 6,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
});

export default mongoose.model("Reset", ResetSchema);
