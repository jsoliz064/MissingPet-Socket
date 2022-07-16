/*
    path : api/login
*/

const { Router, response} = require('express');
const { check } = require('express-validator');
const { crearUsuario, validarToken , borrarUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/new', [
    check('username', 'username Es obligatorio').not().isEmpty(),
    validarCampos
],  crearUsuario);

router.get('/check',  validarToken);


router.post('/delete', [
    check('uid', 'uid Es obligatorio').not().isEmpty(),
    validarCampos
],  borrarUsuario);


module.exports = router;