const router = require('express').Router();
const User = require('../../models/user.models');
const bcrypt = require('bcryptjs');

const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');


router.get('/profile', checkToken, async (req, res) => {
    const user = await User.findById(req.user._id).populate('products')
    res.json(user)
});

router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 9)
    try {
        const user = await User.create(req.body)
        res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //Existe email en la BD?
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ error: 'Error en email y/o contraseña' })
        }

        //Coinciden las passord?
        const iguales = bcrypt.compareSync(password, user.password)
        if (!iguales) {
            return res.status(401).json({ error: 'Error en email y/o contraseña' })
        }

        res.json({
            success: 'Login correcto ',
            token: createToken(user)
        });

    } catch (err) {
        res.json({ error: err.message })
    }

});



module.exports = router;