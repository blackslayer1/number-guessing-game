import './App.scss';
import React, { useState } from 'react';

function App() {

  function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  let [number, setNumber] = useState<number>(randomIntFromInterval(1, 50));
  let [input, setInput] = useState<string>("");
  let [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  let [guessesRemaining, setGuessesRemaining] = useState<number>(10);
  let [header, setHeader] = useState("ㅤ");
  let [checked, setChecked] = useState<boolean>(false);
  let [maxNumber, setMaxNumber] = useState<number>(50);


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((e.target as HTMLInputElement).value);
  }

  const reset = () => {
    setNumber(randomIntFromInterval(1, 50));
    setMaxNumber(50);
    setGuessesRemaining(10);
    (document.getElementById('input') as HTMLInputElement).value = '';
    setHeader("ㅤ");
    setPrevGuesses([]);
    (document.getElementById('difficulty') as HTMLInputElement).value = 'normal';
  }

  const submit = () => {
  if(input !== ""){
    if(guessesRemaining !== 0){
      if(input === number.toString()){
        setHeader("Correct guess!");
      } else {
        if(number < parseInt(input)){
          setHeader("Too high! Try again!");
        } else if (number > parseInt(input)){
          setHeader("Too low! Try again!")
        }
        setPrevGuesses(prevGuesses => [...prevGuesses, input]);
        setGuessesRemaining(guessesRemaining-=1);
      }
    } else {
      setHeader("Out of guesses!");
    }
  } else {
    setHeader("Enter a guess")
  }
}

  const showNumber = () =>{
    alert(number);
  }

  const difficultySelector = () => {
    let difficulty = (document.getElementById('difficulty')! as HTMLInputElement).value;
    if(difficulty==='easy'){
      reset();
      setNumber(randomIntFromInterval(1, 20));
      (document.getElementById('difficulty') as HTMLInputElement).value = 'easy';
      setMaxNumber(20);
    } else if (difficulty==='normal'){
      reset();
      setNumber(randomIntFromInterval(1, 50));
    } else if (difficulty==='difficult'){
      reset();
      setNumber(randomIntFromInterval(1, 100));
      (document.getElementById('difficulty') as HTMLInputElement).value = 'difficult';
      setMaxNumber(100);
    } else if (difficulty==='veryDifficult'){
      reset();
      setNumber(randomIntFromInterval(1, 500));
      (document.getElementById('difficulty') as HTMLInputElement).value = 'veryDifficult';
      setMaxNumber(500);
    }
  }

  const devMode = () => {
    let button = document.getElementById('showNumber')!;
    if(checked !== true){
      button.style.visibility="visible";
      setChecked(true);
    } else {
      button.style.visibility="hidden";
      setChecked(false);
    }
  }

  return (
    <div className="App">
      <h2>Number Guessing Game</h2>
      <p>Try and guess a random number between 1 and {maxNumber}.</p>
      <p>You have 10 attempts to guess the right number.</p>
      <div className="container">
      <h1 style={{color: "white", fontWeight: "normal"}}>Guess a number</h1>
      <input id='input' onChange={changeHandler} type="number" min="0" style={{height: "60px", width: "70%", fontSize: "50px"}}></input>
      <br/>
      <button onClick={submit} className="submit">Submit guess</button>
      <p style={{color: "white"}}>Previous Guesses: {prevGuesses.length > 0 ? prevGuesses.join(", ") : "None"}</p>
      <p style={{color: "white"}}>Guesses Remaining: {guessesRemaining}</p>
      <h2>{header}</h2>
      <button onClick={reset} style={{marginRight: "100px"}}>Reset Game</button>
      <button id='showNumber' onClick={showNumber}>Show Number</button>
      <label style={{marginLeft: "100px", marginRight: "10px", color: "white"}}>Difficulty</label>
      <select onChange={difficultySelector} id="difficulty">
        <option value="easy">Easy</option>
        <option value="normal" selected>Normal</option>
        <option value="difficult">Difficult</option>
        <option value="veryDifficult">Extremely Difficult</option>
      </select>
      <div style={{position: "absolute", bottom: "15px", right: "20px"}}>
      <input onChange={devMode} type="checkbox"/>
      <label>Developer Mode</label>
      </div>
      </div>
    </div>
  );
}

export default App;
