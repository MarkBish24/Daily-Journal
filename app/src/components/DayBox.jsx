import "./DayBox.css";

export default function DayBox({ index }) {
  return (
    <>
      <div className="day-box">
        <div className="day-index">{index}</div>
      </div>
    </>
  );
}
