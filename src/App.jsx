import Sidebar from './Sidebar'
import MainSection from './MainSection'
import { useState } from 'react';

const [ALARM, CHRONO, CLOCK, TIMER, WEATHER, TODO, DEATH] = [0, 1, 2, 3, 4, 5, 6]

export default function App() {
    let [currentApp, setApp] = useState(ALARM);

    function shiftApp(app) {
        return () => setApp(app)
    }

    return <>
        <Sidebar currentApp={currentApp} shiftApp={shiftApp}/>
        <MainSection currentApp={currentApp}/>
    </>
}

