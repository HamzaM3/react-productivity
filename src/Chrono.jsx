import { useState, useRef, useEffect } from 'react';

const [START, ONGOING, PAUSE] = [0, 1]

export default function Timer() {
    const [screen, setScreen] = useState(START);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [milli, setMilli] = useState(0);
    let dateStart = useRef(0);
    let currentTime = useRef(0);
    let chrono = useRef(null);

    function format(nb, pad) {
        return String(nb).padStart(pad, '0')
    }

    function updateTime() {
        let t = Date.now() - dateStart.current + currentTime.current;
        console.log(t)

        let ms = t % 1000;
        t = Math.floor(t / 1000);
        let sec = t % 60;
        t = Math.floor(t / 60);
        let min = t % 60;
        t = Math.floor(t / 60);
        let hour = t;

        setHour(hour);
        setMin(min);
        setSec(sec);
        setMilli(ms);
    }

    function startChrono() {
        dateStart.current = Date.now();
        currentTime.current = 0
        chrono.current = setInterval(updateTime, 5)
        setScreen(ONGOING)
    }
    
    function pauseChrono() {
        currentTime.current = Date.now() - dateStart.current + currentTime.current;
        console.log('-------- ',currentTime.current)
        clearInterval(chrono.current)
        setScreen(PAUSE)
    }

    function restartChrono() {
        dateStart.current = Date.now()
        chrono.current = setInterval(updateTime, 5)

        setScreen(ONGOING)
    }

    function stopChrono() {
        clearInterval(chrono.current)
        dateStart.current = 0;
        currentTime.current = 0;
        setHour(0);
        setMin(0);
        setSec(0);
        setMilli(0);
        setScreen(START)
    }

    return  <div className='chrono'>
        <h1>Chrono</h1>
        <div className='time'>
            <div>{format(hour, 2)}</div>
            <div>:</div>
            <div>{format(min, 2)}</div>
            <div>:</div>
            <div>{format(sec, 2)}</div>
            <div>:</div>
            <div className='milli'>{format(milli, 3)}</div>
        </div>
        <div className='buttons'>
            {screen === START ?
               <div class='button' onClick={startChrono}>Start</div> 
             : screen === ONGOING ?
               (<>
                    <div class='button' onClick={pauseChrono}>Pause</div>
                    <div class='button' onClick={stopChrono}>Stop</div>
                </>)
             : (<>
                    <div class='button' onClick={restartChrono}>Restart</div>
                    <div class='button' onClick={stopChrono}>Stop</div>
                </>)}
        </div>
    </div>;
}