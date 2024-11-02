import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [gameOver, setGameOver] = useState(false)
  const [checkWinner, setCheckWinner] = useState(null)

  // Add additional states below as required.

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gameOver || inputValue.length !== 1) return;

    const inputletter = inputValue.toLowerCase();

    if (!guessedLetters.includes(inputletter)) {
      setGuessedLetters([...guessedLetters, inputletter]);
      if (!currWord.includes(inputletter)) {
        setRemainingGuesses((prev) => prev - 1);
      }
    }
    setInputValue("");

    const isWin = currWord.split("").every((char) => guessedLetters.includes(char) || char === inputletter);
    if (isWin) {
      setGameOver(true);
      setCheckWinner("Congratulations You Win!");
    } else if (remainingGuesses - 1 <= 0) {
      setGameOver(true);
      setCheckWinner(`Game Over! The word was: ${currWord}`);
    }
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setRemainingGuesses(10);
    setInputValue("");
    setGameOver(false);
    setCurrentWord(getRandomWord());
  };

  // create additional function to power the

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <div>
          {!gameOver ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                maxLength="1"
              />
              <button type="submit">Guess</button>
            </form>
          ) : (
            <button onClick={resetGame}>Play Again</button>
          )}
          {gameOver && (
            <h2>{checkWinner}</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
