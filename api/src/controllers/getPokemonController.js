const axios = require('axios');
const { Pokemon, Type } = require('../db.js')

const getPokeData = async url => {
    const {data} = await axios(url);
    const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.versions["generation-v"]['black-white'].front_default,
        health: data.stats[0].base_stat,
        defense: data.stats[2].base_stat,
        attack: data.stats[1].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map(type => type.type.name)
    }
    return pokemon
}


const listApiPokemon = async () => {
    let {data} = await axios('https://pokeapi.co/api/v2/pokemon?limit=51');
    let listPokemon = data.results
    const pokemon = await Promise.all(listPokemon.map(async pokeData => {
        const url = pokeData.url;
        const info = await getPokeData(url);
        return info
        }
    ));

    return pokemon;
};
let listDbPokemon = async () => {
    let dbPokemon = await Pokemon.findAll({
        include:[
            {
                model: Type,
                attributes: ["name"],
                through: {attributes: []},
            }
        ]
    });
    dbPokemon = dbPokemon.map(poke  => {
        const pokemon = {
            id: poke.id,
            name: poke.name,
            image: poke.image,
            health: poke.health,
            defense: poke.defense,
            attack: poke.attack,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight,
            types: poke.Types.map( type => type.name),
            createdInDb: poke.createdInDb
            
        }
        return pokemon 
    })
    return dbPokemon
};

const listPokemon = async () => {
    const apiPokemon = await listApiPokemon();
    const dbPokemon = await listDbPokemon();
    const allPokemon =  apiPokemon.concat(dbPokemon);
    return allPokemon;
}
module.exports = {listPokemon};