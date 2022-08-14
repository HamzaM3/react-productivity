import { useState } from 'react';

export default function Alarm () {
    let [hour, setHour] = useState(5);
    let [min, setMin] = useState(17);
    let [started, setStarted] = useState(false);

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

    function toggleStarted () {
        setStarted(s=>!s)
    }

    return <div className='alarm'>
        <h1>Alarm</h1>
        <div className='time'>
            <div>{format(hour)}</div>
            <div>:</div>
            <div>{format(min)}</div>
        </div>

        <div className='buttons-row'>
            {started ?
                (<>
                    <div>
                        <div onClick={incrementHour}>+</div>
                        <div onClick={decrementHour}>-</div>
                    </div>
                    <div>
                        <div onClick={incrementMin}>+</div>
                        <div onClick={decrementMin}>-</div>
                    </div>
                </>
                )
                : null
            }
            </div>

        <div className='toggle-button' onClick={toggleStarted}>
            {started ? 'Start' : 'Cancel'} Alarm
        </div>
    </div>;
}