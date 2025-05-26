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

  useEffect(() => {
    const check = async () => {
      const formatted = formatDate(date);
      const exists = await handleCheckEntry(formatted);
      if (exists) {
        const content = await handleGetEntry(formatted);
        setParagraph(content);
      }
      setEntryExists(exists);
    };

    check();
  }, [date]);

  return (
    <>
      <div
        className={`day-box ${entryExists ? "has-entry" : "no-entry"}`}
        id={formatDate(date)}
        onClick={() => {
          handleOpenTextEditor(formatDate(date));
        }}
      >
        <div className="day-index">{index}</div>
        {entryExists ? <div className="paragraph"> {paragraph}</div> : null}
      </div>
    </>
  );
}
