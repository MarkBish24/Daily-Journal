import React, { useState, useEffect } from "react";

import { BsChevronBarUp } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

import emojis from "./emojis.js";
import "./EmojiKeyboard.css";

export default function EmojiKeyboard({ positions }) {
  return (
    <div
      className="keyboard-container"
      style={{
        position: "fixed",
        top: positions.y - 300,
        left: positions.x - 100,
        zIndex: 1000,
      }}
    >
      <div className="keyboard-header-container">
        <div className="drag-bar">
          <BsChevronBarUp />
        </div>

        <button className="close-button">
          <IoIosClose />
        </button>
      </div>

      <div className="emoji-grid">
        {emojis.map((emoji, index) => (
          <button className="emoji-button" key={index}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
