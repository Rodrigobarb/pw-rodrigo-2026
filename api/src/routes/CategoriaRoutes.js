const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const router = express.Router();

router.get('/', CategoriaController.get);
router.get('/:codigo', CategoriaController.getByCodigo);
router.post('/', CategoriaController.add);
router.put('/', CategoriaController.update);
router.delete('/:codigo', CategoriaController.delete);

module.exports = router;
