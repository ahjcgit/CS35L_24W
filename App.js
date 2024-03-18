import { useState } from 'react';

function Square({value, onSquareClick}) {
  return(
    <button className="square" onClick={onSquareClick}>
    {value}
    </button>
  );
}


/*
Pseudocode concept
Until we reach move 6, we follow standard tic-tac-toe rules
From move 7 onwards we can select one of our chosen 'X' or 'O' 
respectively and can click on an adjacent square
0 can move to 1, 3, 4, 1 can move to 0, 2, 3, 4, 5 and so on. 
Either implement drag and drop or click and click
need to notify user of selection of certain square(Either tint change or label)

There are no gamestates that result in a immovable state without the game ending in a win/loss

The center square must be either evacuated or the next move must be a winning move
*/

function Board({ xIsNext, squares, onPlay, currentMove, hasSelected, selectedSquare, sethasSelected, setselectedSquare}) {
 
  //Check if it is a valid move and whether there is currently a winner
  function handleClick(i) {
    if (squares[i] && currentMove < 6 || calculateWinner(squares)){
      return;
    }
    //Normal Tic-tac-toe behavior until move 7
    const nextSquares = squares.slice();

    if(currentMove < 6){
      nextSquares[i] = xIsNext ? "X" : "O";
      onPlay(nextSquares);
    } 
    else{ //If not selected, select valid square. Then choose empty space to move
      if (!hasSelected){
        if((xIsNext && squares[i] === "X") || (!xIsNext && squares[i] === "O")){
          setselectedSquare(i);
          sethasSelected(true);
        }
        else{
          console.log("Invalid square selected: Next move should be %s", xIsNext ? "X" : "O")
        }
      }
      else {
        if(moveValid(selectedSquare, i) && centerClause(xIsNext, selectedSquare, i)){
          console.log("%s moved from %d to %d", xIsNext ? "X" : "O", selectedSquare, i)
          nextSquares[selectedSquare] = null;
          nextSquares[i] = xIsNext ? "X" : "O";
          onPlay(nextSquares)
          sethasSelected(false);
        }
        else{
          console.log("Invalid move: select another move")
          sethasSelected(false);
          setselectedSquare(null);
        }
      }  
    }
    
    
  }

  function moveValid(selectedSquare, i){ //Checks if the destination square is adjacent and empty
    if(selectedSquare === 0){
      if(i === 1 || i === 3 || i === 4){
        if(squares[i]===null){
          return true;
        } 
      }
    }
    if(selectedSquare === 1){
      if(i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5){
        if(squares[i]===null){
          return true;
        }
      }
    }
    if(selectedSquare === 2){
      if(i === 1 || i === 4 || i === 5){
        if(squares[i]===null){
          return true;
        }
      }
    }
    if(selectedSquare === 3){
      if(i === 0 || i === 1 || i === 4 || i === 6 || i === 7){
        if(squares[i]===null){ 
          return true; 
        }
      }
    }
    if(selectedSquare === 4){
      if(i === 0 || i === 1 || i === 2 || i === 3 || i === 5 || i === 6 || i === 7 || i === 8){
        if(squares[i]===null){ 
          return true; 
        }
      }
    }
    if(selectedSquare === 5){
      if(i === 1 || i === 2 || i === 4 || i === 7 || i === 8){
        if(squares[i]===null){
          return true;
        }
      }
    }
    if(selectedSquare === 6){
      if(i === 3 || i === 4 || i === 7){
        if(squares[i]===null){
          return true;
        }
      }
    }
    if(selectedSquare === 7){
      if(i === 3 || i === 4 || i === 5 || i === 6 || i === 8){
        if(squares[i]===null){
          return true;
        }
      }
    }
    if(selectedSquare === 8){
      if(i === 4 || i === 5 || i === 7){
        if(squares[i]===null){
          return true;
        }
      }
    }
    return false;
  }

  function centerClause(xIsNext, selectedSquare, i){ //Additional check for center escape clause
    
    if((xIsNext ? "X" : "O") === squares[4]){
      let centerCheck = squares.slice();  
      centerCheck[selectedSquare] = null;
      centerCheck[i] = xIsNext ? "X" : "O";
      if(calculateWinner(centerCheck) || selectedSquare === 4){
        return true;
      }
      else{
        return false;
      }
    }
    else{
        return true;
    }  
  }
  

  
  const winner = calculateWinner(squares); //Shows turn player, and winner once game is decided
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else{
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
  <>
    <div className="status">{status}</div>
    <div className="board-row">  
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">  
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">  
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  );

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b]&&squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
  }
}

export default function Game(){
  const [selectedSquare, setselectedSquare] = useState(null);
  const [hasSelected, sethasSelected] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    }
    else{
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove}
        hasSelected={hasSelected} sethasSelected={sethasSelected} selectedSquare = {selectedSquare} setselectedSquare={setselectedSquare}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}