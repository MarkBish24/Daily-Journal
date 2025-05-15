import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Editor.css";

import {
  handleCheckEntry,
  handleGetEntry,
  handleSaveEntry,
} from "../src/DataBaseFunctions.jsx";

export default function Editor() {
  const { date } = useParams();

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const parsedDate = new Date(date);

  const TitleDate = parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDate = parsedDate.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const exists = await handleCheckEntry(formattedDate);
      if (exists) {
        const savedContent = await handleGetEntry(formattedDate);
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
            handleSaveEntry(formattedDate, content);
            alert(`Saved content for ${TitleDate}: ${content}`);
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
