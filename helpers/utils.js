const jwt = require('jsonwebtoken');

const createToken = (user) => {

    const payload = {
        user_id: user._id,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token
};

module.exports = { createToken };