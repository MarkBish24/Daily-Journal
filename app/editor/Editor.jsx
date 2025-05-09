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

  return (
    <div className="editor-container">
      <h1>Text Editor for {date}</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update content in real-time
        rows="20"
        cols="60"
      />
      <button
        onClick={() => {
          alert(`Saved content for ${date}: ${content}`);
        }}
      >
        Save
      </button>
    </div>
  );
}
