const fs = require('fs')
const axios = require('axios')

class Busquedas {
    historial =[]
    dbPATH = './db/database.json'

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ')
            palabras = palabras.map( p => p[0].toLocaleUpperCase() + p.substring(1))
            return palabras.join(' ')
        })
    }

    get paramsMapBox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit' : 5,
            'lenguaje' : 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad( lugar = '' ) {
        // console.log(lugar)
        try {
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            return []; 
        }
    }

    async climaLugar (lat, lon){
        try {
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    'lat': lat,
                    'lon': lon
                }
            })

            const resp = await intance.get();
            const { weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max:main.temp_max,
                temp: main.temp

            }
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            ReadableStreamDefaultController;
        }
        this.historial.unshift(lugar.toLocaleLowerCase())
        this.guardarDB()
    }
    guardarDB(){
        const payLoad = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPATH, JSON.stringify(payLoad))
    }

    leerDB(){
        if(!fs.existsSync(this.dbPATH)){
            return;
        }
        const info = fs.readFileSync(this.dbPATH, {encoding:'utf-8'})
        const data = JSON.parse(info)

        this.historial = data.historial
    }
}

module.exports = Busquedas