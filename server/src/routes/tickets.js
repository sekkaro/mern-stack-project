import express from "express";
import { userAuth } from "../middlewares/authorization";
import Ticket from "../models/Ticket";
import { errorHandler } from "../utils/errorHandler";

const router = express.Router();

// create new ticket
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

// get all tickets for a specific user
router.get("/", userAuth, async (req, res) => {
  try {
    const clientId = req.userId;

    const result = await Ticket.find({ clientId });

    // const tickets = result.map((ticket) => {
    //   const { clientId, ...others } = ticket._doc;
    //   return others;
    // });

    res.status(200).json(result);
  } catch (err) {
    errorHandler(err, res);
  }
});

// get a ticket
router.get("/:tid", userAuth, async (req, res) => {
  try {
    const tId = req.params.tid;
    const clientId = req.userId;

    const ticket = await Ticket.findOne({ _id: tId, clientId });

    res.status(200).json(ticket);
  } catch (err) {
    errorHandler(err, res);
  }
});

export default router;
