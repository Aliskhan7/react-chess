import React, {useEffect, useState} from 'react';
import {Board} from "./modules/Board";
import BoardComponent from "./components/BoardComponent";
import './App.css'
import {Player} from "./modules/Player";
import {Colors} from "./modules/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null> (null)

    useEffect(() =>{
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigure()
        setBoard(newBoard)
    }

    function swapPlayer(){
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
      <div className="app">
          <Timer
              restart={restart}
              currensPlayer={currentPlayer}
          />
          <BoardComponent
              board={board}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              swapPlayer={swapPlayer}
          />
          <LostFigures
              title='черныые фигуры'
              figures={board.lostBlackFigures}
          />
          <LostFigures
              title='Белые фигуры'
              figures={board.lostWhiteFigures}
          />
      </div>
  );
};

export default App;
