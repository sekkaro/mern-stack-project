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

// update reply message from client
router.put("/:tid", userAuth, async (req, res) => {
  try {
    const { message, sender } = req.body;
    const tId = req.params.tid;
    const clientId = req.userId;

    const ticket = await Ticket.findOneAndUpdate(
      { _id: tId, clientId },
      {
        $push: {
          conversations: {
            message,
            sender,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(ticket);
  } catch (err) {
    errorHandler(err, res);
  }
});

// update ticket status to close
router.patch("/close-ticket/:tid", userAuth, async (req, res) => {
  try {
    const tId = req.params.tid;
    const clientId = req.userId;

    const ticket = await Ticket.findOneAndUpdate(
      { _id: tId, clientId },
      {
        status: "Closed",
      },
      { new: true }
    );

    res.status(200).json(ticket);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Delete a ticket
router.delete("/:tid", userAuth, async (req, res) => {
  try {
    const tId = req.params.tid;
    const clientId = req.userId;

    await Ticket.findOneAndDelete({ _id: tId, clientId });

    res.status(200).send("success");
  } catch (err) {
    errorHandler(err, res);
  }
});

export default router;
