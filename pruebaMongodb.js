const mongoose = require('mongoose');
const productModels = require('./models/product.models');

const Product = require('./models/product.models');

( async ()=>{
    await mongoose.connect('mongodb://127.0.0.1/tienda-online');
    
    // Crear un producto

    // await Product.create({
    //     name: 'silla',
    //     description: 'es una silla :) ',
    //     price: 12,
    //     department: 'hogar',
    //     available: false,
    //     created_at: new Date()
    // })

    

    // recuperar documentos
    const products = await Product.find();
    // console.log(products.map(p=>p.name));



    // Filtrar documentos
    const productsHogar = await Product.find({ 
        department: "hogar",
        available: false
    }).select({ name: 1, _id: 0});
    // console.log(productsHogar)



    // filtrar por precio mayor a 10 (gt means greater than )
    const productsPrecio = await Product.find({
        price: { $gt: 10} //( $gte: mayor que, $lt: <menor, $lte: menor que, ne: not equal (distinto que))
    });
    // console.log(productsPrecio)



    // productos que cumplen varios requsitos
    const options = {
        $or: [
            { available: true },
            { price: { $lt: 14 }}
        ]
    }  

    const productsOr = await Product.find(options);
    console.log(productsOr)





    await mongoose.disconnect();

})();
