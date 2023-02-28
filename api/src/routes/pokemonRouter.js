const { Router } = require('express');
const router = Router();

const { listPokemon } = require('../controllers/getPokemonController.js');
const { takePokemon } = require('../controllers/getByIdController.js');
const { findByName} = require('../controllers/getByNameController.js');
const { addPokemon } = require('../controllers/postPokemonContoller.js');

router.get('/', async (req, res) => {
    try{
        const { name } = req.query;
        const allPokemon = await listPokemon();
        if(name){
            
            const pokemon = await findByName(name);
            if(pokemon) return res.status(200).json(pokemon);

            return res.status(404).send("The searched pokemon does not exist, verify that it is spelled correctly, in the search bar")
            }
        
        return res.status(200).send(allPokemon);
        
    }
    catch(error){
        res.status(404).json({err:error.message});
    };
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const poke = await takePokemon(id);
        res.status(200).json(poke);   
    }
    catch(err){
        res.status(404).send("This pokemon is not aviable");
    }
});

router.post('/', async (req, res) => {
    const {name, image, health, defense, attack, speed, height, weight, types} = req.body;
    try {
        res.status(201).json( await addPokemon(name, image, health, defense, attack, speed, height, weight, types));
    
    }
    catch (error) {
        res.status(404).json({err: error.message});
    }
}) ;





module.exports = router;