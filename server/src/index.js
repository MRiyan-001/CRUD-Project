import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./database/mongoDB.js";
import taskRouter from "./routes/task_router.js";

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors({ credentials: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Api Working");
}); // testing route

app.use("/api/tasks", taskRouter);

// server port
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
