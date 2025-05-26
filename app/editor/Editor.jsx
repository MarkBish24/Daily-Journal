import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Editor.css";

import {
  handleCheckEntry,
  handleGetEntry,
  handleSaveEntry,
} from "../src/DataBaseFunctions.jsx";

export default function Editor() {
  const { date } = useParams();

  function parseDateAsLocal(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsedDate = parseDateAsLocal(date);

  console.log(date, parsedDate);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const TitleDate = parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const exists = await handleCheckEntry(date);
      if (exists) {
        const savedContent = await handleGetEntry(date);
        setContent(savedContent || "");
      } else {
        setContent("");
      }
      setLoading(false);
    }
    fetchContent();
  }, [date]);

  return (
    <div className="editor-container">
      <h1 className="title">{TitleDate}</h1>
      <textarea
        className="text-box"
        placeholder="How was your day? ;)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        cols="60"
      />
      <button
        className="submit-button"
        onClick={() => {
          try {
            handleSaveEntry(date, content);
          } catch (error) {
            alert(`Error Occured Saving Data: ${error}`);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
