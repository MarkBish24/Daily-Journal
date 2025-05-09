import "./Header.css";
export default function Header({ date, setDate }) {
  function increaseMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  function decreaseMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }
  return (
    <>
      <div className="header-container">
        <div className="left-arrow" onClick={decreaseMonth}>
          &lsaquo;
        </div>
        <div className="title">
          {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <div className="right-arrow" onClick={increaseMonth}>
          &rsaquo;
        </div>
      </div>
      <div className="subheader-container">
        <div className="day-column">Sunday</div>
        <div className="day-column">Monday</div>
        <div className="day-column">Tuesday</div>
        <div className="day-column">Wednesday</div>
        <div className="day-column">Thursday</div>
        <div className="day-column">Friday</div>
        <div className="day-column">Saturday</div>
      </div>
    </>
  );
}
