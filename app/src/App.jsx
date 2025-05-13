import { useState } from "react";

import "./App.css";
import Header from "./components/Header.jsx";
import Calendar from "./components/Calendar.jsx";
import Editor from "../editor/Editor.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [date, setDate] = useState(new Date());

  const handleOpenTextEditor = async (targetDate) => {
    try {
      await window.electronAPI.openTextEditor(targetDate);
    } catch (error) {
      console.error("Failed to open text editor:", error);
    }
  };

  const handleCheckEntry = async (targetDate) => {
    try {
      const entry = await window.electronAPI.checkEntry(targetDate);
      return entry;
    } catch (error) {
      console.error("Failed to find date in DataBase:", error);
      return false;
    }
  };

  const handleGetEntry = async (targetDate) => {
    try {
      const entry = await window.electronAPI.getEntry(targetDate);
      return entry;
    } catch (error) {
      console.error("Failed to find date in DataBase:", error);
      return null;
    }
  };

  const handleSaveEntry = async (targetDate, content) => {
    try {
      await window.electronAPI.saveEntry(targetDate, content);
      console.log("Entry saved successfully");
    } catch (error) {
      console.error("Failed to save entry to database:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header date={date} setDate={setDate} />
              <Calendar
                date={date}
                handleOpenTextEditor={handleOpenTextEditor}
              />
            </>
          }
        ></Route>
        <Route path="/editor/:date" element={<Editor />} />
      </Routes>
    </Router>
  );
}
