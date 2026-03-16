import React, { useState } from "react";
import { getXPReward } from "../utilis/xpSystem";
import CodeEditor from "./CodeEditor";

const questTemplates = {
  JavaScript: {
    description: "Write a JS function that flattens a nested array.",
    test: (code) => {
      const fn = new Function(`${code}; return flatten([1,[2,[3]]])`);
      return JSON.stringify(fn()) === JSON.stringify([1, 2, 3]);
    },
  },
  Python: {
    description: "Write a Python function that finds the second largest number in a list.",
    test: () => true, // Python can't run in browser, auto-pass for now
  },
  Java: {
    description: "Write a Java method that checks if a string is a palindrome.",
    test: () => true, // Java can't run in browser, auto-pass for now
  },
  TypeScript: {
    description: "Write a TypeScript interface for a User object with name, email, and age.",
    test: (code) => code.includes("interface") && code.includes("name") && code.includes("email") && code.includes("age"),
  },
  CSS: {
    description: "Create a CSS animation that makes a div bounce.",
    test: (code) => code.includes("@keyframes") && code.includes("animation"),
  },
  HTML: {
    description: "Create an HTML form with validation for name, email, and password.",
    test: (code) => code.includes("<form") && code.includes("email") && code.includes("password"),
  },
  default: {
    description: "Write a function that reverses a string.",
    test: (code) => {
      try {
        const fn = new Function(`${code}
          const fns = Object.values(this).filter(v => typeof v === 'function');
          const rev = fns.find(f => { try { return f("hello") === "olleh"; } catch { return false; } });
          return rev ? rev("hello") : null;
        `);
        return fn() === "olleh";
      } catch {
        return false;
      }
    },
  },
};

function QuestGenerator({ languages, onQuestAccepted }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateQuest = () => {
    if (!languages || languages.length === 0) return;
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const template = questTemplates[randomLang] || questTemplates["default"];
    const xpReward = getXPReward(randomLang);
    setCurrentQuest({ language: randomLang, ...template, xpReward });
    setUserCode("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!userCode.trim()) {
      alert("Please write your solution first!");
      return;
    }

    setSubmitted(true);
    const passed = currentQuest.test(userCode);

    if (passed) {
      onQuestAccepted && onQuestAccepted({ ...currentQuest, userCode });
      setCurrentQuest(null);
      setUserCode("");
      setSubmitted(false);
    } else {
      alert("Incorrect solution. Try again!");
      setSubmitted(false);
    }
  };

  return (
    <div className="quest-generator">
      <h3>Quest Generator</h3>
      <button
        onClick={generateQuest}
        disabled={!languages || languages.length === 0}
      >
        Generate Quest from My Languages
      </button>

      {currentQuest && (
        <div className="generated-quest">
          <span className="quest-language">{currentQuest.language}</span>
          <p>{currentQuest.description}</p>
          <CodeEditor onCodeChange={setUserCode} />
          <button onClick={handleSubmit} disabled={submitted}>
            {submitted ? "Checking..." : `Submit Quest (+${currentQuest.xpReward} XP)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestGenerator;