const fs = require('fs');
const axios = require('axios')

class Searches{
    history = [];
    dbPath= './db/database.js';
    constructor(){
        this.readDB();
    }

    get historyCap(){
        return this.history.map(place =>{
            let words = place.split(' ');
            words = words.map(w => w[0].toLocaleLowerCase() + w.substring(1));
            return words.join('');
        });
    }
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit':5,
            'language': 'es'
        }
    }

    get paramsWather(){
        return {
            appid: process.env.OPENWATHER_KEY,
            metric:"metric",
            lang: 'es'
        }
    }
    async city(place = ''){
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        });
        const response = await instance.get();
        //  console.log("city => ",response.data.features);
    
        return response.data.features.map(place => (
            {
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }
        ));
    }

    async wheatherPerPlace(lat, lon){
        try {
            //
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: { ... this.paramsWather, lat , lon }
                
            });
            
            const response = await instance.get();
            const { weather,main } = response.data;
            // console.log('response =>',response.data);
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max:  main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.log("error", error);
        }
    }

    addHistory(place = ''){
        if( this.history.includes( place.toLocaleLowerCase())){
          return;  
        }
        this.history = this.history.splice(0,5);
        this.history.unshift(place.toLocaleLowerCase());

        //save in db
        this.saveDB();
    }

    saveDB(){
        const payload = {
            history: this.history
        }
        fs.writeFileSync( this.dbPath, JSON.stringify(payload));
    }
    readDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }
        const info  = fs.readFileSync(this.dbPath,{ encoding:'utf-8' })
        const data = JSON.parse(info);
        this.history = data.history; 
    }
}

module.exports = Searches;