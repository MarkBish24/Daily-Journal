import React, { useState, useEffect, useRef } from "react";

import { BsChevronBarUp } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

import emojis from "./emojis.js";
import "./EmojiKeyboard.css";

export default function EmojiKeyboard({ positions, setDisplayKeyboard }) {
  const [position, setPosition] = useState(positions);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position]);

  return (
    <div
      className="keyboard-container"
      style={{
        position: "fixed",
        top: position.y - 300,
        left: position.x - 120,
        zIndex: 10,
      }}
    >
      <div className="keyboard-header-container">
        <div className="drag-bar" onMouseDown={handleMouseDown}>
          <BsChevronBarUp />
        </div>

        <button
          className="close-button"
          onClick={() => {
            setDisplayKeyboard(false);
          }}
        >
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
