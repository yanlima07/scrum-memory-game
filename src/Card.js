// Card.js
import React from "react";
import "./styles.css";

export default function Card({ card, onClick, flipped }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={flipped ? "flipped" : ""}>
        <div className="front">{card.word}</div>
        <div className="back">?</div>
      </div>
    </div>
  );
}
