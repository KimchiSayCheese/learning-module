import express from "express";
import morgan from "morgan";
import router from "./router";
import cors from "cors";

import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { body } from "express-validator";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);

app.use((req, res, next) => {
  req.shhh_secret = "doggy";
  next();
});

app.get("/", (req, res, next) => {
  //   setTimeout(() => {
  //     next(new Error("hello"s));
  //   }, 1);

  res.json({ message: "hello" });
});

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: `invalid input` });
  } else {
    res.stats(500).json({ message: "thats on us" });
  }
});

export default app;
