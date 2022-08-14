import Sidebar from './Sidebar'
import MainSection from './MainSection'
import { useState } from 'react';

export default function App() {
    let [currentApp, setApp] = useState(3);

    function shiftApp(app) {
        return () => setApp(app)
    }

    return <>
        <Sidebar currentApp={currentApp} shiftApp={shiftApp}/>
        <MainSection/>
    </>
}

