import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./styles.css";

const words = ["SCRUM", "SCRUM MASTER", "PRODUCT OWNER", "DEVELOPERS"];

function shuffle(array) {
  const duplicated = [...array, ...array];
  return duplicated
    .map((word) => ({ word, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // Inicia o jogo embaralhado
  useEffect(() => {
    setCards(shuffle(words));
    setFlipped([]);
    setMatched([]);
  }, []);

  function handleClick(index) {
    if (flipped.length === 2 || flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].word === cards[second].word) {
        setMatched((prev) => [...prev, cards[first].word]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }

  // Função para reiniciar o jogo
  function restartGame() {
    setCards(shuffle(words));
    setFlipped([]);
    setMatched([]);
  }

  const hasWon = matched.length === words.length;

  return (
    <div className="container">
      <h1>SCRUM MEMORY GAME</h1>
      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            flipped={flipped.includes(index) || matched.includes(card.word)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {hasWon && (
        <div style={{ marginTop: "30px" }}>
          <h2>PARABÉNS</h2>
          <button onClick={restartGame} className="restart-btn">
            REINICIAR
          </button>
        </div>
      )}
    </div>
  );
}
