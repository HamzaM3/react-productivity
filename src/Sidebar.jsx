import {SVGAlarm, SVGChrono, SVGClock, SVGDeathCount, SVGTimer, SVGTodo, SVGWeather} from './svg';
export default function Sidebar ( {shiftApp, currentApp} ) {
    return <div className='sidebar'>
        <div className={currentApp === 0 ? 'glow' : ''} onClick={shiftApp(0)}>
            <SVGAlarm/>
        </div>

        <div className={currentApp === 1 ? 'glow' : ''} onClick={shiftApp(1)}>
            <SVGChrono/>
        </div>

        <div className={currentApp === 2 ? 'glow' : ''} onClick={shiftApp(2)}>
            <SVGClock/>
        </div>

        <div className={currentApp === 3 ? 'glow' : ''} onClick={shiftApp(3)}>
            <SVGTimer/>
        </div>

        <div className={currentApp === 4 ? 'glow' : ''} onClick={shiftApp(4)}>
            <SVGWeather/>
        </div>
        
        <div className={currentApp === 5 ? 'glow' : ''} onClick={shiftApp(5)}>
            <SVGTodo/>
        </div>

        <div className={currentApp === 6 ? 'glow' : ''} onClick={shiftApp(6)}>
            <SVGDeathCount/>
        </div>
    </div>
}