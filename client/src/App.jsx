import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Hero from "./components/Hero";
import Tasks from "./pages/Tasks";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="" element={<Hero />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
