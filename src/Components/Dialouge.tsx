import React, { useState, useEffect } from 'react';
import "../Styling/Dialouge.css"; // We will create this file

const dialogue = [
  {
    name: "JOSAIAH",
    text: "You’ve stumbled into my world — a space where ideas turn into interfaces, logic becomes interaction, and concepts are built line by line.",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "I’m Josaiah Borres, a developer who believes that great experiences aren’t just built — they’re felt.",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "From clean front-end interfaces to reliable back-end systems, I focus on clarity, usability, and performance — because every user interaction tells a story",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "Every project represents a challenge accepted — a system designed, a problem solved, or an idea brought to life.",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "My goal is to create systems that don’t just work, but invite interaction, spark curiosity, and leave a lasting impression.",
    character: "/character1.png",
  },



  {
    name: "JOSAIAH",
    text: "Feel free to look around my projects!",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "If you’re looking to collaborate, build something meaningful, or just talk about ideas — I’m one message away.",
    character: "/character1.png",
  },
];

export const DialogueBox = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsFinished(false);
    const fullText = dialogue[index].text;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsFinished(true);
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [index]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicks from triggering parent events
    if (!isFinished) {
      setDisplayedText(dialogue[index].text);
      setIsFinished(true);
    } else {
      setIndex((prev) => (prev < dialogue.length - 1 ? prev + 1 : 0));
    }
  };

  const current = dialogue[index];

  return (
    <div className="vn-box" onClick={handleNext}>
      <div className="vn-character-container">
        <img src={current.character} alt={current.name} className="vn-character" />
      </div>

      <div className="vn-text-container">
        <div className="vn-nametag">{current.name}</div>
        <p className="vn-text">
          {displayedText}
          <span className="cursor-blink">|</span>
        </p>
        <div className={`vn-arrow ${isFinished ? 'finished' : ''}`}>
          {isFinished ? "NEXT ▶" : "..."}
        </div>
      </div>
    </div>
  );
};