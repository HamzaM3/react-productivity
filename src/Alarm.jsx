import { useState, useRef, useEffect } from 'react';
import { SVGRingOn, SVGRingOff } from './svg';

const [START, CANCEL, RING] = [0, 1, 2]

function Ring () {
    const [ringing, setRinging] = useState(false);
    let ring = useRef(0);
    const beep = useRef(new Audio('https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/bell-ring-reverb_fJ6bZw4u_NWM.mp3'));

    function startRing () {
        beep.current.currentTime = 0;
        beep.current.play()
        setRinging(true);
        ring.current = setTimeout(stopRing, 2300)
    }
    function stopRing() {
        setRinging(false);
        ring.current = setTimeout(startRing, 3500)
    }
    
    useEffect(() => {
        console.log('Oj')
        startRing()
        return () => {beep.current.pause();clearTimeout(ring.current)}
    }, [])

    return (ringing? <SVGRingOn/> : <SVGRingOff/>)
}

function Buttons( { incrementHour, decrementHour, incrementMin, decrementMin} ) {
    return <>
        <div>
            <div onClick={incrementHour}>+</div>
            <div onClick={decrementHour}>-</div>
        </div>
        <div>
            <div onClick={incrementMin}>+</div>
            <div onClick={decrementMin}>-</div>
        </div>
    </>
}

export default function Alarm () {
    let [hour, setHour] = useState(5);
    let [min, setMin] = useState(17);
    let [screen, setScreen] = useState(START);
    let alarm = useRef(null)

    function format(nb) {
        return String(nb).padStart(2, '0');
    }

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

    function startAlarm() {
        let d = new Date(Date.now());
        d.setHours(hour);
        d.setMinutes(min);
        d.setSeconds(0);
        d.setMilliseconds(0);
        if (Number(d) <= Date.now()) d = new Date(Number(d) + 1000*60*60*24);

        console.log("Alarm set for : ", d)

        alarm.current = setTimeout(() => {setScreen(RING)},  Number(d) - Date.now())

        setScreen(CANCEL)
    }

    function cancelAlarm() {
        clearTimeout(alarm.current);
        alarm.current = null;
        setScreen(START)
    }

    function closeBell () {
        setScreen(START)
    }

    if (screen !== RING){
        return <div className='alarm'>
            <h1>Alarm</h1>
            <div className='time'>
                <div>{format(hour)}</div>
                <div>:</div>
                <div>{format(min)}</div>
            </div>

            <div className='buttons-row'>
                {
                    screen === START 
                    ? <Buttons incrementHour={incrementHour} 
                               decrementHour={decrementHour}
                               incrementMin={incrementMin}
                               decrementMin={decrementMin}/>
                    : null
                }
            </div>

            <div className='toggle-button' onClick={screen === START ? startAlarm : cancelAlarm}>
                {screen === START ? 'Start' : 'Cancel'} Alarm
            </div>
        </div>;
    } else {
        return <div className='alarm ringing' onClick={closeBell}>
            <h1>Alarm</h1>
            <Ring/>
        </div>
    }
    
}