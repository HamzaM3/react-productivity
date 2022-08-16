import { useState, useRef, useEffect } from 'react';
import { SVGArrow } from './svg'

export default function Weather () {
    let input = useRef()
    const [temp, setTemp] = useState(null)

    // This is temporary until the backend is ready
    const geocode_key = "AIzaSyBxLPiu1VNvOv4fGxYyaVVfrmYhn5kF0Ro"
    const weather_init = {
        method: "GET",
        headers: {
            "X-API-Key": "3ede36a8015644f2af74136efb"
        }
    }

    function getGeocodeURL(address) {
        address = encodeURI(address)
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocode_key}`
        return url
    }
    
    function getMetarURL(lat, lon) {
        return `https://api.checkwx.com/metar/lat/${lat}/lon/${lon}/decoded`
    }

    async function getTemp () {
        try {
            let address = input.current.value
            let data = await fetch(getGeocodeURL(address)).then(resp=>resp.json())
            console.log(data.results[0])
            let loc  = data.results[0].geometry.location
            let lat = Number(loc.lat).toFixed(2)
            let lon = Number(loc.lng).toFixed(2)
            console.log(lat, lon)
    
            data = await fetch(getMetarURL(lat, lon), weather_init).then(resp => resp.json())
            console.log(data)
            data = data.data[0]
            
            setTemp(data.temperature.celsius)
        } catch {
            setTemp(null)
        }
    }

    useEffect(() => {
        input.current.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') getTemp()
        })
    }, [])

    return  <div className='weather'>
        <h1>Weather</h1>
        <div className='input'>
            <div className="city">
                    <input ref={input} spellCheck="false" type="text"/>
            </div>
            <SVGArrow onClick={getTemp}/>
        </div>
        <div className='temp'>
            {temp !== null ? String(temp) : '??'}°C
        </div>
</div>
}