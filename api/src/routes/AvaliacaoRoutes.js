const express = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = express.Router();

router.get('/', AvaliacaoController.get);
router.get('/produto/:produto', AvaliacaoController.getByProduto);
router.get('/:codigo', AvaliacaoController.getByCodigo);
router.post('/', AvaliacaoController.add);
router.put('/', AvaliacaoController.update);
router.delete('/:codigo', AvaliacaoController.delete);

module.exports = router;
