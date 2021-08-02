const fs = require('fs');

const url = './db/data.json'

const  guardarDB = ( data ) =>{
    fs.writeFileSync(url, JSON.stringify(data))
}

const leerDB = () => {
    if( !fs.existsSync(url)){
        return null;
    }
    const info = fs.readFileSync(url, {encoding:'utf-8'});
    const data = JSON.parse(info);
    // return info
    return data
}

module.exports = {
    guardarDB,
    leerDB
}