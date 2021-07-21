import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxLength: 100,
    required: true,
    default: "",
  },
  openedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    maxLength: 30,
    required: true,
    default: "Pending operator response",
  },
  conversations: [
    {
      sender: {
        type: String,
        maxLength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxLength: 1000,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

export default mongoose.model("Ticket", TicketSchema);
