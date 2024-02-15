import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import cors from "cors";

// Initialize cors middleware
const corsMiddleware = cors({ methods: ["GET", "POST"] });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/counterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema
const counterSchema = new mongoose.Schema({
  count: Number,
});

// Define a model
const Counter = mongoose.model("Counter", counterSchema);

// Create an instance of the model
const counter = new Counter({ count: 0 });

// Save the new model instance
counter.save();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the cors middleware
  corsMiddleware(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred during the request." });
    }

    // Handle GET request
    if (req.method === "GET") {
      const counter = await Counter.findOne();
      return res.status(200).json({ count: counter.count });
    }

    // Handle POST request
    if (req.method === "POST") {
      const counter = await Counter.findOne();
      counter.count += 1;
      await counter.save();
      return res.status(200).json({ count: counter.count });
    }

    // Handle unsupported methods
    return res.status(405).json({ message: "Method Not Allowed" });
  });
}
