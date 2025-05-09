import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Editor.css";

export default function Editor() {
  const { date } = useParams();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (date) {
      setContent(`Editor content for the date: ${date}`);
    }
  }, [date]);

  const parsedDate = new Date(date);

  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="editor-container">
      <h1 className="title">{formattedDate}</h1>
      <textarea
        className="text-box"
        placeholder="How was your day? ;)"
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        cols="60"
      />
      <button
        className="submit-button"
        onClick={() => {
          alert(`Saved content for ${formattedDate}}: ${content}`);
        }}
      >
        Submit
      </button>
    </div>
  );
}
