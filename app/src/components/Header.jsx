import "./Header.css";
export default function Header() {
  return (
    <>
      <div className="header-container">
        <div className="left-arrow">&lsaquo;</div>
        <div className="title">Month Year</div>
        <div className="right-arrow">&rsaquo;</div>
      </div>
      <div className="subheader-container">
        <div className="day-column">Monday</div>
        <div className="day-column">Tuesday</div>
        <div className="day-column">Wednesday</div>
        <div className="day-column">Thursday</div>
        <div className="day-column">Friday</div>
        <div className="day-column">Saturday</div>
        <div className="day-column">Sunday</div>
      </div>
    </>
  );
}
