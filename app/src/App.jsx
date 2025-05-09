import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Calendar from "./components/Calendar.jsx";

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
    <>
      <Header date={date} setDate={setDate} />
      <Calendar date={date} handleOpenTextEditor={handleOpenTextEditor} />
    </>
  );
}
