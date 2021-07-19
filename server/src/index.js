import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import ticketRoute from "./routes/tickets";

const main = () => {
  const app = express();

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("common"));
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json())

  // app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  // app.use("/api/posts", postRoute);
  app.use("/api/tickets", ticketRoute);

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log("Backend server is running");
  });
};

main();
