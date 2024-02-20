import express from "express";
import next from "next";
import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
