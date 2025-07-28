import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { dummyTasksData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // fetching all tasks
  const fetchAllTasks = async () => {
    const { data } = await axios.get(`${backendUrl}/api/tasks/allTasks`);
    if (data.success) {
      setTasks(data.tasks);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);


  const value = {
    tasks,
    setTasks,
    fetchAllTasks,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
