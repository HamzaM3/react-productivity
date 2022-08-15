import { useState, useRef, useEffect } from 'react';

export default function Clock () {
    let hour = useRef(null)
    let min = useRef(null)
    let sec = useRef(null)

    let [hour_pos, setHourPos] = useState({x1:50, y1: 50, x2: 50, y2: 50});
    let [min_pos, setMinPos] = useState({x1:50, y1: 50, x2: 50, y2: 50});
    let [sec_pos, setSecPos] = useState({x1:50, y1: 50, x2: 50, y2: 50});

    let hour_length = 25;
    let min_length = 40
    let sec_length = 40;
    
    let hour_tail_length = 0;
    let min_tail_length = 0
    let sec_tail_length = 0;

    function getPos(needle_angle, needle_length) {
        needle_angle = needle_angle - Math.PI / 2;
    
        let x1 = 50;
        let y1 = 50;
    
        let x2 = 50 + needle_length * Math.cos(needle_angle);
        let y2 = 50 + needle_length * Math.sin(needle_angle);

        return {x1, y1, x2, y2}
    }
    
    function updateClock() {
        let date = new Date();
        let h, m, s;
        [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
    
        let hour_angle = h /12 * 2 * Math.PI
        let min_angle = m / 60 * 2 * Math.PI;
        let sec_angle = s / 60 * 2 * Math.PI;
    
        setHourPos(getPos(hour_angle, hour_length));
        setMinPos(getPos(min_angle, min_length));
        setSecPos(getPos(sec_angle, sec_length));
    }

    useEffect(()=>{
        setInterval(updateClock, 211)
    }, [])

    return <div className='clock'>
        <h1>Clock</h1>
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <circle id="clock" cx="50" cy="50" r="50"/>
                <clipPath id="outside">
                    <use href="#clock"></use>
                </clipPath>
            </defs>

            <g> 
                <use href="#clock" clipPath="url(#outside)"></use>
                <line ref={hour} id="hour" {...hour_pos} />
                <line ref={min} id="min"   {...min_pos} />
                <line ref={sec} id="sec"   {...sec_pos} />
                <circle id="center-circle" cx="50" cy="50" r="2"></circle>
            </g>

        </svg>
    </div>
}