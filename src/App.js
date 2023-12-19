import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./WrongLetters";
import Word from "./components/Word";
import Notification from "./Notification";
import Popup from "./Popup";
import { showNotification as show } from "./helpers/helpers";
import "./App.css";

const words = [
  "JavaScript",
  "Python",
  "Java",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "TypeScript",
];

let selectedWord =
  words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(selectedWord);

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      console.log(keyCode);
      if (
        playable &&
        ((keyCode >= 65 && keyCode <= 90) ||
          [186, 192, 222, 219].includes(keyCode))
      ) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random].toLowerCase();
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />

      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
