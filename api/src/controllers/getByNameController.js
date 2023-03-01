const axios  = require('axios');
const { Pokemon,Type } = require('../db.js')


const findByName = async name => {
    try {
        let pokemon = await Pokemon.findOne({
            where: {name},
            include: {
                model: Type,
                attributes: ['name'],
                through:{attributes:[]}
            }

        });
        if(pokemon) return pokemon;
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const poke = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.home.front_default,
                health: data.stats[0].base_stat,
                defense: data.stats[2].base_stat,
                attack: data.stats[1].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map( type => type.type.name)
            }
            return poke
    }
    catch (err) {
    
        throw("The searched pokemon does not exist, verify that it is spelled correctly, in the search bar");
    }

    
};
module.exports = { findByName };
