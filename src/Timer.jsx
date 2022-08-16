import { useState, useRef, useEffect } from 'react';
import { SVGCircle } from './svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const [START, ONGOING, PAUSE] = [0, 1, 2]

export default function Timer () {
    let remaining= useRef(0)
    let endTime = useRef(Date.now())
    let interval = useRef(null)

    let [hour, setHour] = useState(0);
    let [min, setMin] = useState(15);
    let [sec, setSec] = useState(0);
    let [screen, setScreen] = useState(START);

    function incrementHour() {
        setHour(hour => (hour + 1) % 24)
    }

    function decrementHour() {
        setHour(hour => (hour + 23) % 24)
    }

    function incrementMin() {
        setMin(min => (min + 1) % 60)
    }

    function decrementMin() {
        setMin(min => (min + 59) % 60)
    }

    function incrementSec() {
        setSec(sec => (sec + 1) % 60)
    }

    function decrementSec() {
        setSec(sec => (sec + 59) % 60)
    }

    function format(nb) {
        return String(nb).padStart(2, '0');
    }

    function startTimer() {
        let total_time = (hour * 3600 + min * 60 + sec) * 1000;
        endTime.current  = Date.now() + total_time;
        interval.current = setInterval(() => {
            remaining.current = endTime.current - Date.now()

            if (remaining.current <= 0) {
                ringTimer()
                return;
            }

            let t = Math.floor(remaining.current / 1000);
            let sec = t % 60;
            t = Math.floor(t / 60);
            let min = t % 60;
            t = Math.floor(t / 60);
            let hour = t;
            setHour(hour);
            setMin(min);
            setSec(sec);
        }, 100)
        setScreen(ONGOING)
    }

    function pauseTimer() {
        clearInterval(interval.current);
        setScreen(PAUSE)
    }

    function stopTimer() {
        clearInterval(interval.current);
        setScreen(START)
    }

    function ringTimer () {
        clearInterval(interval.current);
        let beep = new Audio('https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/bell-ring-reverb_fJ6bZw4u_NWM.mp3');
        beep.currentTime = 0;
        beep.play()
        setScreen(START)
    }

    function proportion() {
        return 1;
    }
    return <div className='timer'>
        <h1>Timer</h1>
        <div className='circle'>
            <SVGCircle proportion={proportion()}/>
            <div className='menu'>
                <div className="time">
                    <div className='hour'>
                        {screen === START ? <FontAwesomeIcon icon={faChevronUp} onClick={incrementHour} /> : null}
                        <div>{format(hour)}</div>
                        {screen === START ? <FontAwesomeIcon icon={faChevronDown} onClick={decrementHour} /> : null}
                    </div>

                    <div>:</div>
                    <div className="min">
                        {screen === START ? <FontAwesomeIcon icon={faChevronUp} onClick={incrementMin} /> : null}
                        <div>{format(min)}</div>
                        {screen === START ? <FontAwesomeIcon icon={faChevronDown} onClick={decrementMin} /> : null}
                    </div>

                    <div>:</div>

                    <div className="sec">
                        {screen === START ? <FontAwesomeIcon icon={faChevronUp} onClick={incrementSec} /> : null}
                        <div>{format(sec)}</div>
                        {screen === START ? <FontAwesomeIcon icon={faChevronDown} onClick={decrementSec} /> : null}
                    </div>
                </div>

                <div className="buttons">
                    {
                        screen === START ? (<div className="start" onClick={startTimer}>Start</div>)
                        : screen ===ONGOING ? (<>
                                <div className="pause" onClick={pauseTimer}>Pause</div>
                                <div className="stop" onClick={stopTimer}>Stop</div>
                            </>
                        )
                        :   (<>
                                <div className="restart" onClick={startTimer}>Restart</div>
                                <div className="stop" onClick={stopTimer}>Stop</div>
                            </>
                        )

                    }
                    
                </div>
            </div>
        </div>
    </div>
}