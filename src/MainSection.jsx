import Alarm from './Alarm'
import Chrono from './Chrono'
import Clock from './Clock'

const [ALARM, CHRONO, CLOCK, TIMER, WEATHER, TODO, DEATH] = [0, 1, 2, 3, 4, 5, 6]

export default function MainSection( { currentApp } ) {
    switch (currentApp) {
        case ALARM:
            return <Alarm/>;
        case CHRONO:
            return <Chrono/>;
        case CLOCK:
            return <Clock/>
        default: 
            return null;
    }

    
}