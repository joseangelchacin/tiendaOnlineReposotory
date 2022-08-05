module.exports = {
    name: {
        exists: true,
        errorMessage: 'El campo nombre es requerido',
        isLength: {
            options: { min: 3 },
            errorMessage: "el campo nombre debe tener minimo 3"
        }
    },
    available: {
        isBoolean: true,
        errorMessage: 'El campo available debe ser true/false',
        custom: {
            options: (value) => value,
            errorMessage: "las inserciones debene estar disponibles"
        }
    }
}