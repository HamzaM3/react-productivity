import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const [INPUT, ESTIMATION] = [0, 1]

export default function Death () {
    let [date, setDate] = useState(new Date(2000, 0,1))
    let [screen, setScreen] = useState(INPUT)

    function incrementDay() {
        setDate(d => {let d1 = new Date(d); d1.setDate(d1.getDate() + 1); return d1})
    }

    function decrementDay() {
        setDate(d => {
            let d1 = new Date(d);
            d1.setDate(d1.getDate() - 1);
            return d1
        })
    }
    
    function incrementMonth() {
        setDate(d => {
            let d1 = new Date(d);
            d1.setMonth(d1.getMonth() + 1);
            return d1
        })
    }

    
    function decrementMonth() {
        setDate(d => {
            let d1 = new Date(d);
            d1.setMonth(d1.getMonth() - 1);
            return d1
        })
    }
    
    function incrementYear() {
        setDate(d => {
            let d1 = new Date(d);
            d1.setFullYear(d1.getFullYear() + 1);
            return d1
        })
    }
    
    function decrementYear() {
        setDate(d => {
            let d1 = new Date(d);
            d1.setFullYear(d1.getFullYear() - 1);
            return d1
        })
    }
    
    function switchScreen() {
        setScreen(ESTIMATION)
    }

    console.log(date)
    return <div className='death'>
        { screen === INPUT ?
            (<><div className='label'>
                Enter your birth date :
            </div>

            <div className='input'>
                <div className='day'>
                    <FontAwesomeIcon icon={faChevronUp} onClick={incrementDay} />
                    <div>{date.getDate()}</div>
                    <FontAwesomeIcon icon={faChevronDown} onClick={decrementDay} />
                </div>

                <div>/</div>

                <div className='month'>
                    <FontAwesomeIcon icon={faChevronUp} onClick={incrementMonth} />
                    <div>{date.getMonth()+1}</div>
                    <FontAwesomeIcon icon={faChevronDown} onClick={decrementMonth} />
                </div>

                <div>/</div>

                <div className='year'>
                    <FontAwesomeIcon icon={faChevronUp} onClick={incrementYear} />
                    <div>{date.getFullYear()}</div>
                    <FontAwesomeIcon icon={faChevronDown} onClick={decrementYear} />
                </div>
            </div>

            <div className='ok' onClick={switchScreen}>OK</div>
        </>)
        : (<>
            <div className='count'>You have <span>{Math.floor((Number(date) - Date.now() + 60*365*24*60*60*1000) / (24*60*60*1000))}</span> days left</div>
            <div className='message'>Spend them well</div>
        </>
        )
    }
    </div>;
}