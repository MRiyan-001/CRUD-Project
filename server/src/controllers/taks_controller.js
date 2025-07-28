import Task from "../models/Task_model.js";

// Random messages
const messages = [
  "Task crushed. Keep the momentum!",
  "One step closer to your goals!",
  "You did it — onward and upward!",
  "Another win in the bag!",
  "Progress feels good, doesn’t it?",
];


// Creating task 
export const creatTask = async (req, res) => {
  const { taskName, taskDesc } = req.body;

  const existedTask = await Task.findOne({ taskName, taskDesc });
  if (existedTask) {
    return res.json({ success: false, message: "Task has already been added" });
  }

  const newtask = await Task.create({ taskName, taskDesc });
  if (!newtask) {
    return res.json({ success: false, message: "Something went wrong" });
  }

  res.json({ success: true, newtask, message: "New Task added successfully" });
};

// getting all tasks 
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true });
    // sorting
    tasks.sort((a, b) => a.completed - b.completed);

    res.json({ success: true, tasks });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// updating tasks 
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, taskDesc } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskName: taskName, taskDesc: taskDesc },
      { new: true, runvalidators: true }
    );
    if (!updatedTask) {
      return res.json({
        success: false,
        message: "Something wents wrong in updating task",
      });
    }
    res.json({
      success: true,
      updatedTask,
      message: "Task has been successfully updated.",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// deleting tasks 
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    res.json({ success: true, message: "Task has been deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// updaitng tasks status
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const completedTask = await Task.findByIdAndUpdate(id, { completed: true });
    res.json({
      success: true,
      completedTask,
      message: messages[Math.floor(Math.random() * messages.length)],
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
