import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../modules/Player";
import {Colors} from "../modules/Colors";
import internal from "stream";

interface TimerProps{
    currensPlayer: Player | null,
    restart: () => void
}

const Timer: FC <TimerProps> = ({currensPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)


    useEffect(() =>{
        startTimer()
    }, [currensPlayer])

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currensPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }
    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function hendlerRestart(){
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={hendlerRestart}>restart</button>
            </div>
            <div>
                <h2>Черные {blackTime}</h2>
                <h2>Белые {whiteTime}</h2>
            </div>
        </div>
    );
};

export default Timer;