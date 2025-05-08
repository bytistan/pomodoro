import React, { useEffect, useState } from 'react';
import TypingEffect from "./TypingEffect";

export default function TextBubble({ status }) {
  const [bubbleText, setBubbleText] = useState("");

  const phrases = {
    welcome: [
      "Welcome back!",
      "Ready to be productive?",
      "Let’s start something great!",
      "You’ve got this!"
    ],
    work: [
      "Stay focused!",
      "Keep going!",
      "You can do it!",
      "Push your limits!"
    ],
    break: [
      "Time to relax!",
      "Take a deep breath.",
      "Enjoy your break!",
      "Stretch your legs!"
    ],
    angry: [
      "Get back to work!",
      "No excuses!",
      "Focus. Now!",
      "You're better than this!"
    ],    
    complete: [
      "Well done!",
      "You crushed it!",
      "Victory!",
      "Great job finishing!"
    ],
    empty_page: [
      "Nothing here!"
    ]
  };

  useEffect(() => {
    if (phrases[status]) {
      const options = phrases[status];
      const random = options[Math.floor(Math.random() * options.length)];
      setBubbleText(random);
    } else {
      setBubbleText("Ready?");
    }
  }, [status]);

  return (
    <div className="bg-white rounded-bubble p-3 d-flex justify-content-center align-items-center">
      <TypingEffect key={bubbleText} text={bubbleText} speed={50} />
    </div>
  );
}
