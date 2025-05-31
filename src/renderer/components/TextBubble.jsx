import React, { useEffect, useState } from 'react';
import TypingEffect from "./TypingEffect";

export default function TextBubble({ text }) {
  const [bubbleText, setBubbleText] = useState("");
  const [effectKey, setEffectKey] = useState(0);

  useEffect(() => {
    if (Array.isArray(text) && text.length > 0) {
      const random = text[Math.floor(Math.random() * text.length)];
      setBubbleText(random);
      setEffectKey(prev => prev + 1);
    } else if (typeof text === "string") {
      setBubbleText(text);
      setEffectKey(prev => prev + 1);
    } else {
      setBubbleText("I am tomato?");
      setEffectKey(prev => prev + 1);
    }
  }, [text]);

  return (
    <div className="bg-white rounded-bubble p-3 d-flex justify-content-center align-items-center">
      {bubbleText && <TypingEffect key={effectKey} text={bubbleText} speed={50} />}
    </div>
  );
}
