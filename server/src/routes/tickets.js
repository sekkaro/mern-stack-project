import express from "express";
import { userAuth } from "../middlewares/authorization";
import Ticket from "../models/Ticket";
import { errorHandler } from "../utils/errorHandler";

const router = express.Router();

router.post("/", userAuth, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;

    const ticket = new Ticket({
      clientId: req.userId,
      subject,
      conversations: [{ sender, message }],
    });

    const savedTicket = await ticket.save();
    res.status(200).json(savedTicket);
  } catch (error) {
    errorHandler(err, res);
  }
});

export default router;
