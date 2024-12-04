import { useState } from 'react'
import './App.css'
import Board from './Board'
import { firstState, calcScore } from "./module";
import Settings from './Settings';

function App() {
  const [gameState, setGameState] = useState({
    board: firstState,
    score: {p1:0, p2:0},
    currentPlayer: 1
  });
  const [settings, setSettings] = useState({
    player: 2,
    k: 8,
    pronning: true
  });

  if (gameState.currentPlayer  == settings.player) {
    const newBoard = gameState.board.map(column => [...column]); // Deep copy the board
        for (let row = 5; row >= 0; row--) {
          if (newBoard[0][row] === 0) {
            newBoard[0][row] = gameState.currentPlayer;
            let newScore = calcScore(newBoard)
            setGameState({
              ...gameState,
              board: newBoard,
              score: newScore,
              currentPlayer: gameState.currentPlayer === 1? 2:1
            }
            )
            break;
          }
        }
  }


  return (
    <>
      <h1>Score {gameState.score.p1} - {gameState.score.p2}</h1>
      <Board
        gameState = { gameState }
        setGameState = { setGameState }
      />
      <Settings
        settings = { settings }
        setSettings = { setSettings }
      />
    </>
  )
}

export default App
