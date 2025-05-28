import "./DayBox.css";
import {
  handleOpenTextEditor,
  handleCheckEntry,
  handleGetEntry,
  formatDate,
} from "../DataBaseFunctions.jsx";

import { useEffect, useState } from "react";

export default function DayBox({ index, date }) {
  const [entryExists, setEntryExists] = useState(false);
  const [paragraph, setParagraph] = useState("");

  const today = formatDate(new Date());
  const formatted = formatDate(date);

  useEffect(() => {
    const check = async () => {
      const exists = await handleCheckEntry(formatted);
      if (exists) {
        const content = await handleGetEntry(formatted);
        setParagraph(
          content.length > 100 ? content.slice(0, 100) + "..." : content
        );
      }
      setEntryExists(exists);
    };

    check();
  }, [date]);

  return (
    <>
      <div
        className={`day-box ${entryExists ? "has-entry" : "no-entry"} ${
          today === formatted ? "pulse-effect" : ""
        }`}
        id={formatDate(date)}
        onClick={() => {
          if (entryExists) handleOpenTextEditor(formatDate(date));
        }}
      >
        <div className="day-index">{index}</div>
        {entryExists ? <div className="paragraph"> {paragraph}</div> : null}
      </div>
    </>
  );
}
