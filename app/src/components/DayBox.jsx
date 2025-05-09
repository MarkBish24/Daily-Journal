import "./DayBox.css";

export default function DayBox({ index, handleOpenTextEditor, date }) {
  return (
    <>
      <div className="day-box" onClick={() => handleOpenTextEditor(date)}>
        <div className="day-index">{index}</div>
      </div>
    </>
  );
}
