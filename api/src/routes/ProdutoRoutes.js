const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

router.get('/', ProdutoController.get);
router.get('/categoria/:categoria', ProdutoController.getByCategoria);
router.get('/:codigo', ProdutoController.getByCodigo);
router.post('/', ProdutoController.add);
router.put('/', ProdutoController.update);
router.delete('/:codigo', ProdutoController.delete);

module.exports = router;
