import React, { useState, useEffect } from 'react';
import "../Styling/Dialouge.css"; // We will create this file

const dialogue = [
  {
    name: "JOSAIAH",
    text: "Hello there! I'm Josaiah.",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "I'm a Full-stack Developer who loves building interactive experiences.",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "Feel free to look around my projects below!",
    character: "/character1.png",
  },
  {
    name: "JOSAIAH",
    text: "If you want to chat, just hit that Contact button in the corner.",
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