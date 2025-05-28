import React, { useState, useEffect } from "react";

import emojis from "./emojis.js";
import "./EmojiKeyboard.css";

export default function EmojiKeyboard({ positions }) {
  return (
    <div
      className="emoji-container"
      style={{
        position: "fixed",
        top: positions.y,
        left: positions.x,
      }}
    ></div>
  );
}
