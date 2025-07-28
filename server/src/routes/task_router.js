import express from "express";
import {
  creatTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taks_controller.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", creatTask);
taskRouter.get("/allTasks", getAllTasks);
taskRouter.put("/updateTask/:id", updateTask);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.patch("/updateStatus/:id", updateTaskStatus);

export default taskRouter;
