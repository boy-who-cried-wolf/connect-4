import { useState } from "react";
import './board.css'
import { calcScore } from "./module";
export default function Board({ gameState, setGameState }){

    const handleColumnClick = (colIndex) => {
        const newBoard = gameState.board.map(column => [...column]); // Deep copy the board
        for (let row = 5; row >= 0; row--) {
          if (newBoard[colIndex][row] === 0) {
            newBoard[colIndex][row] = gameState.currentPlayer;
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
      };
      

    return(
        <div className="board">
      {gameState.board.map((column, colIndex) => (
        <div className="column" key={colIndex} onClick={() => handleColumnClick(colIndex)}>
          {column.map((cell, rowIndex) => (
            <div
              className={`cell p${cell}`}
              key={rowIndex}
              id={`col${colIndex}-row${rowIndex}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
    )
}