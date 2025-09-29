import React, { useContext, useEffect, useRef, useState } from "react";
import AddTask from "../components/AddTask";
import { AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import UpdateTask from "../components/UpdateTask";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl, tasks, setTasks, fetchAllTasks } = useContext(AppContext);

  const dropdownRef = useRef(null);

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/tasks/deleteTask/${id}`
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Handle task completion
  const handleCompleteTask = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/tasks/updateStatus/${id}`
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Handling outside clicks for hiding dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuIndex(null); // Close the dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // fetching all tasks when task changes
  useEffect(() => {
    fetchAllTasks();
  }, [tasks]);

  return (
    <>
      <div className="mx-2 md:mx-10 xl:mx-32 pt-8 py-8">
        <div className="w-full min-h-[80vh] flex flex-col gap-8 border border-gray-300 shadow-lg bg-white/30 rounded-lg p-6">
          {/* <h1 className="text-4xl font-bold mb-8">
            my<span className="text-[#d98c4a]">Tasks</span>
          </h1> */}
          <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#d98c4a] mr-auto rounded text-white px-4 py-2 font-semibold cursor-pointer"
        >
          Add Task
        </button>

          {tasks && tasks.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {tasks.map((task, index) => (
                <li
                  key={task._id}
                  className={`border border-orange-100 shadow bg-white border-b-2 border-b-[#d98c4a] p-3 rounded flex items-center gap-2 justify-between hover:-translate-y-1 transition-all duration-200 cursor-pointer ${
                    task.completed ? "border-b-green-500" : ""
                  }`}
                >
                  <div className="flex-1 truncate">
                    <h2
                      className={`text-lg font-semibold text-gray-800 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.taskName}
                    </h2>

                    <p className="text-sm text-gray-400 font-light truncate">
                      {task.taskDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <input
                      onChange={() => handleCompleteTask(task._id)}
                      type="checkbox"
                      className={`cursor-pointer h-4 w-4`}
                      checked={task.completed}
                      disabled={task.completed}
                    />

                    <span
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      ref={openMenuIndex === index ? dropdownRef : null}
                      className="relative"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="cursor-pointer"
                      />
                      {openMenuIndex === index && (
                        <div className="absolute bg-gray-100 rounded right-0 top-0 shadow-md z-20">
                          <ul className="text-sm flex flex-col">
                            <li
                              onClick={() => setEditingTask(task)}
                              className="hover:text-white hover:bg-[#d98c4a] px-3 py-1"
                            >
                              <button className="cursor-pointer">Edit</button>
                            </li>
                            <li
                              onClick={() => handleDeleteTask(task._id)}
                              className="hover:text-white hover:bg-[#d98c4a] px-3 py-1"
                            >
                              <button className="cursor-pointer">Delete</button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-2">
              <img src={assets.search_icon} alt="" className="h-7 w-7" />
              <p className="text-gray-500 font-light text-sm">No Task Found</p>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 h-full w-full bg-black/30 flex items-center justify-center"
          >
            <div
              // onClick={() => setShowForm(false)}
              className="relative"
            >
              <AddTask />
              <img
                onClick={() => setShowForm(false)}
                src={assets.cross_icon}
                alt=""
                className="absolute top-2 right-10 cursor-pointer hover:scale-105 transition-all"
              />
            </div>
          </motion.div>
        )}

        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 h-full w-full bg-black/30 flex items-center justify-center"
          >
            <div
              // onClick={() => setShowForm(false)}
              className="relative"
            >
              <UpdateTask task={editingTask} />
              <img
                onClick={() => setEditingTask(null)}
                src={assets.cross_icon}
                alt=""
                className="absolute top-2 right-10 cursor-pointer hover:scale-105 transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && <Loading />}
    </>
  );
};

export default Tasks;
