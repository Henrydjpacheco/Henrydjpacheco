const axios = require('axios');
const { Type } = require('../db.js');

const classify = async () => {
    let dbTypes = await Type.findAll();

    if(dbTypes.length > 0) {
        return dbTypes;
    }
    
    const { data } = await axios('https://pokeapi.co/api/v2/type');
    const types = data.results.map( type => type.name)

        await  Type.bulkCreate(types.map(type =>({name: type})), {ignoreDuplicates: true});
        dbTypes = await Type.findAll();
    
    return dbTypes
}
module.exports = { classify }