import "./Calendar.css";
import DayBox from "./DayBox.jsx";

export default function Calendar() {
  return (
    <>
      <div className="calendar-container">
        <DayBox />
        <DayBox />
        <DayBox />
        <DayBox />
        <DayBox />
        <DayBox />
        <DayBox />
      </div>
    </>
  );
}
