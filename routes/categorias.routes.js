const express = require('express');
const categoriaController = require("../controllers/categorias.controller");

// express router
let router = express.Router();


router.route('/')
    .get(categoriaController.findAll)
    .post(categoriaController.create);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Categorias: what???' });
})

module.exports = router;