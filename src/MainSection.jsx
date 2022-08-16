import Alarm from './Alarm'
import Chrono from './Chrono'
import Clock from './Clock'
import Death from './Death'
import Timer from './Timer'
import Weather from './Weather'
import Todo from './Todo'

const [ALARM, CHRONO, CLOCK, TIMER, WEATHER, TODO, DEATH] = [0, 1, 2, 3, 4, 5, 6]

export default function MainSection( { currentApp } ) {
    switch (currentApp) {
        case ALARM:
            return <Alarm/>;
        case CHRONO:
            return <Chrono/>;
        case CLOCK:
            return <Clock/>
        case WEATHER:
            return <Weather/>
        case DEATH:
            return <Death/>
        case TODO:
            return <Todo/>
        case TIMER:
            return <Timer/>
        default: 
            return null;
    }

    
}