const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares');
const { actualizarImagenClaudinary} = require('../controllers/uploads');



const router = Router();

// router.post('/', cargarArchivo);

router.put('/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    validarCampos
], actualizarImagenClaudinary);

module.exports = router;