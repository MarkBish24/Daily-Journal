import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Calendar from "./components/Calendar.jsx";

export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Header date={date} setDate={setDate} />
      <Calendar date={date} />
    </>
  );
}
