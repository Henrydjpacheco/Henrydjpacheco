const { Router } = require('express');

const { classify } = require('../controllers/getTypeController.js');
const router = Router();

router.get('/', async ( req, res) => {
    try{
        const types = await classify();
        res.status(200).send(types);
    }
    catch{
        res.status(404).send({message: 'error'});
    }
});

module.exports = router;