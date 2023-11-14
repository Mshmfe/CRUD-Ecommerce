import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

import { dev } from "./config/server.js";
import productRouter from "./routes/productRoute.js";

const app = express();
const port = dev.app.port || 8080;

app.listen(port, () => {
  console.log(`server run at http://127.0.0.1:${port}`);
});

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, //  how many request you want to make at 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
  message: "to many request within 1 minutes please try later ",
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products',productRouter);



app.get("/", limiter, (req, res) => {
  res.send("hello world");
});

//client error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// server error=>app level middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
});
