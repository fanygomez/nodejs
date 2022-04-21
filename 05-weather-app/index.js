const { green } = require("colors");
const inquirer = require("inquirer");
const { readInput, inquirerMenu, pause, placeList } = require("./helpers/inquirer");
const Search = require("./models/searches");
require("colors");
require('dotenv').config();

const main = async() => {
    console.clear();
    
    const search = new Search();
    let  opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //show message
                const term = await readInput('City: ');
                //search places
               const places =  await search.city(term);
                // select a place
                //console.log(places);
                const id = await placeList(places);
                if(id === '0') continue;
                const placeSelect = places.find(place => place.id);
                // console.log("id", placeSelect);
                //save in db
                search.addHistory(placeSelect.name);
                //weather
                const weather = await search.wheatherPerPlace(placeSelect.lat,placeSelect.lng);
                // console.log("weather",weather);

                // show results

                console.log('\n Info: City \n'.green);
                console.log('City: ',placeSelect.name.green);
                console.log('Lat: ',placeSelect.lng);
                console.log('Lng: ',placeSelect.lat);
                console.log('Temperature: ',weather.temp);
                console.log('Min: ',weather.min);
                console.log('Max: ',weather.max);
                console.log('Description: ',weather.desc.green);
                
                break;
            case 2:
                search.historyCap.forEach( (place, i ) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${ idx } ${ place }`);
                });
                break;    
            default:
                break;
        }

    

        if (opt !== 0) await pause();
    } while (opt !== 0);
}

main();