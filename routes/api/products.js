const router = require('express').Router();
const { checkSchema, validationResult } = require('express-validator');

const Product = require('../../models/product.models');
const User = require('../../models/user.models');

const { checkvalidationErrors } = require('../../helpers/middlewares');
const createProductValidaror = require('../../validators/createProduct.validator');



router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get('/add/:productId', async (req, res) => {
    const { productId } = req.params

    req.user.products.push(productId)
    await req.user.save();
    console.log(req.user)
    res.json({ success: 'producto agregado' });
});

router.get('/cart', async (req, res) => {
    const user = await User
        .findById(req.user._id)
        .populate('products')
    res.json(user.products)
});


router.post('/', checkSchema(createProductValidaror), checkvalidationErrors, async (req, res) => {

    try {
        product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


router.put('/:productId', async (req, res) => {
    try {
        const id = req.params.productId
        const producto = await Product.findByIdAndUpdate(id, req.body, { new: true }); //esto ({new:true}) hace que devuelva el producto editado y no el original
        res.status(200).json(producto)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:productId', async (req, res) => {
    try {
        deletedProduct = await Product.findByIdAndDelete(req.params.productId)
        res.status(200).json(deletedProduct)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});




module.exports = router;