import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Calendar from "./components/Calendar.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Calendar />
    </>
  );
}
