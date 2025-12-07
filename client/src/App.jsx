import React from "react";
import { Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </>
  );
};

export default App;
