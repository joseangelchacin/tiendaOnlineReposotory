const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
;
const checkvalidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    next();
};

const checkToken = async (req, res, next) => {
    // ¿Está el token en la cabecera de Authorization?
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Debes incluir el token de autenticacion' })
    }

    const token = req.headers['authorization'];

    // ¿Es correcto el token?
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        res.status(401).json({ error: 'El token es incorrecto' });
    }

    // Recupero el usuario a partir del token
    // si pasamos a traves de checkToken,tendremos disponible en re.user los datos del usuario logado.
    const user = await User.findById(payload.user_id);
    req.user = user


    next();
}

module.exports = {
    checkvalidationErrors, checkToken
}