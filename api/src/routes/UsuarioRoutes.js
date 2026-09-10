const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.get);
router.get('/:email', UsuarioController.getByEmail);
router.post('/', UsuarioController.add);
router.put('/', UsuarioController.update);
router.delete('/:email', UsuarioController.delete);

module.exports = router;
