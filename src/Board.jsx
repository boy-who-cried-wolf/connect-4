import { useState } from "react";
import './board.css'
export default function Board({ currentPlayer, switchPlayer }){
    const [board, setBoard] = useState(Array(7).fill().map(() => Array(6).fill(0)));

    const handleColumnClick = (colIndex) => {
        const newBoard = board.map(column => [...column]); // Deep copy the board
        for (let row = 5; row >= 0; row--) {
          if (newBoard[colIndex][row] === 0) {
            newBoard[colIndex][row] = currentPlayer;
            setBoard(newBoard);
            switchPlayer(currentPlayer)
            break;
          }
        }
      };
      

    return(
        <div className="board">
      {board.map((column, colIndex) => (
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