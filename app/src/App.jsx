import { useState } from "react";

import "./App.css";
import Header from "./components/Header.jsx";
import Calendar from "./components/Calendar.jsx";
import Editor from "../editor/Editor.jsx";

import {
  handleCheckEntry,
  handleGetEntry,
  handleSaveEntry,
} from "./DataBaseFunctions.jsx";

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
