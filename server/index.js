import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";

import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";

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
  app.use(morgan("common"));

  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/posts", postRoute);

  app.listen(8800, () => {
    console.log("Backend server is running");
  });
};

main();
