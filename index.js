import express from "express";
import getFlats from "./utils/getFlats.js";
import userRouter from "./router/users.js";
import flatsRouter from "./router/flats.js";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

const app = express();

app.use(express.json());
app.use('/users', userRouter)
app.use('/flats', flatsRouter)

app.get("/", async (req, res) => {
  const data = await getFlats()
  res.json(data.length)
});

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO, () => console.log("DB Connected"));
    app.listen(5454, () =>
      console.log("Server started on: http://localhost:" + 5454)
    );
  } catch (error) {
    console.log(error);
  }
};

start();