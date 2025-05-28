import React, { useState, useEffect } from "react";

import emojis from "./emojis.js";
import "./EmojiKeyboard.css";

export default function EmojiKeyboard({ positions }) {
  return (
    <div
      className="emoji-container"
      style={{
        position: "fixed",
        top: positions.y - 300,
        left: positions.x - 100,
      }}
    >
      {emojis.map((emoji, index) => {
        return (
          <button className="emoji-button" key={index}>
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
