const { Pokemon, Type } = require('../db.js');
const { Sequelize } = require('sequelize');
const addPokemon = async (name, image, health, defense, attack, speed, height, weight, types) => {

    switch (true) {
        case !name:
            throw new Error("Please insert a name of the new Pokemon.");
        case !image:
            throw new Error("Please insert the link of the  image of  new pokemon.");
        case !health:
            throw new Error("Please select the hp of the new pokemon");
        case !defense:
            throw new Error("Please select the defense of the new pokemon");
        case !attack:
            throw new Error("Please select the attack of the new pokemon.");
        case !types:
            throw new Error("Please select one or more types of the new pokemon.");
        default:
            break;
        }
    try{
        const createdPokemon = await Pokemon.create({name, image, health, defense, attack, speed, height, weight, types});

        const typeInstances = await Type.findAll({where:{name:types}});
        await createdPokemon.addType(typeInstances)
        return `The pokemon ${name} is has created`
    }catch(error){
        if (error instanceof Sequelize.UniqueConstraintError) throw new Error(`There is already a Pokemon with name ${name} in data base`);
        else throw error;
        
    }
    
}; 

module.exports = { addPokemon };