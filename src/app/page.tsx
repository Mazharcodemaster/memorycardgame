 'use client'

import React, { useState, useEffect } from "react";


const MemoryCardGame = () => {
  const initialImages = [
    { src: "/bootstrap.jpg", id: 6 },
    { src: "/c++.png", id: 7 },
    { src: "/css.jpg", id: 8 },
    { src: "/html.png", id: 9 },
    { src: "/js.png", id: 10 },
    { src: "/next.png", id: 11 },
    { src: "/paython.jpg", id: 12 },
    { src: "/react.png", id: 13 },
    { src: "/tailwind.jpg", id: 14 },
  ];

  const [images, setImages] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (images[firstIndex].src === images[secondIndex].src) {
        setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, images[firstIndex].id]);
        setScore((prevScore) => prevScore + 1);
      }
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards, images]);

  const resetGame = () => {
    const initialImagesCopy = [...initialImages];
    const shuffledCards = [...initialImagesCopy, ...initialImagesCopy].sort(() => Math.random() - 0.5);
    setImages(shuffledCards.map((card, index) => ({ ...card, position: index })));
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const handleCardClick = (clickedIndex: number) => {
    if (!matchedPairs.includes(images[clickedIndex].id) && selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, clickedIndex]);
    }
  };

  return (
    <div className="memory-card-game">
      <h1 className="game-title">Memory Card Game</h1>
      <div className="score">Score: {score}</div>
      <div className="card-container">
        {images.map((card: any, index: number) => (
          <div
            key={index}
            className={`card ${selectedCards.includes(index) ? "selected" : ""} ${
              matchedPairs.includes(card.id) ? "matched" : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {matchedPairs.includes(card.id) || selectedCards.includes(index) ? (
              <img src={card.src} alt={`Card ${card.id}`} />
            ) : (
              <img src="/backcard.png" alt="Back Card" />
            )}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default MemoryCardGame;
