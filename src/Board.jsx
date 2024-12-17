/* eslint-disable react/prop-types */
import { useEffect } from "react";
import './board.css'
import { calcScore, Node, minimax, buildTree, nextMove, minimaxPruning } from "./module";
export default function Board({ gameState, setGameState, settings }){

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

      useEffect( () => {
        if (gameState.currentPlayer  == settings.player) {
          const start = buildTree(new Node(gameState.board.map(column => [...column]),
            gameState.currentPlayer),
          settings.k);
          settings.pronning === false? minimax(start, settings.k, gameState.currentPlayer === 1? true:false)
          : minimaxPruning(start, settings.k, gameState.currentPlayer === 1? true:false)
          let nextNode = nextMove(start)
          
          let newScore = calcScore(nextNode.state);
          setGameState({
            ...gameState,
            board: nextNode.state,
            score: newScore,
            currentPlayer: gameState.currentPlayer === 1? 2:1,
            node: start
          });
        }
      },[gameState.currentPlayer, settings]);
      

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