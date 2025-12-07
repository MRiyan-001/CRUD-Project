import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const UpdateTask = ({ task, onClose }) => {
  const { backendUrl } = useContext(AppContext);

  const [taskId, setTaskId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTaskName(task.taskName);
    setTaskDesc(task.taskDesc);
    setTaskId(task._id);
  }, []);

  // Handle submission
  const handleSubmission = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const taskData = { taskName, taskDesc };

      const { data } = await axios.put(
        `${backendUrl}/api/tasks/updateTask/${taskId}`,
        taskData
      );
      if (data.success) {
        // window.location.reload();
        setLoading(false);
        setTaskName("");
        setTaskDesc("");
        toast.success(data.message);
        onClose();
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-sm max-w-sm">
        <div className=" shadow-lg bg-white flex flex-col items-center gap-12 p-6 border rounded-xl mx-8">
          <h1 className="text-3xl text-gray-600 font-semibold">
            Update a task
          </h1>

          <form
            onSubmit={handleSubmission}
            className="w-full flex flex-col gap-6 text-gray-800"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="taskTitle">Task name</label>
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                type="text"
                placeholder="Write your task name"
                className="border border-gray-300 bg-gray-50 p-2 rounded text-sm text-gray-600"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="taskTitle">Task desc.</label>
              <textarea
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                type="text"
                placeholder="Write your task description"
                rows={3}
                className="border border-gray-300 bg-gray-50 p-2 rounded text-sm text-gray-600"
              />
            </div>

            <button
              type="submit"
              className={`${
                loading && "cursor-progress"
              } bg-[#d98c4a] rounded text-white py-2 font-semibold cursor-pointer`}
            >
              {loading ? "Updating ..." : "Update Task"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
