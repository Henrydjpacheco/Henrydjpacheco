
const axios = require('axios');

const takePokemon = async id => {


        let {data} = await axios(`https://pokeapi.co/api/v2/pokemon/`+id)
        const poke = {
            id: data.id,
            name: data.name,
            image: data.sprites.versions["generation-v"]['black-white'].animated.front_default
            ,
            health: data.stats[0].base_stat,
            defense: data.stats[2].base_stat,
            attack: data.stats[1].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map( type => type.type.name)

        }
        console.log(poke.image)
        return poke

};

module.exports = { takePokemon };