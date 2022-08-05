/* 
function sumar(a, b){
    if(a === 0 && b === 0) {
        return undefined;
    }
    return a + b
}



    describe('GET /api/products', () => {
       
        it('should return sum of two numbers', () => {
            expect(sumar(3,4)).toBe(7);
            expect(sumar(2,3)).toBe(5);        
        });

        it('deberia devolver undefined si los dos parametros son cero', () => {
            expect(sumar(0, 0)).toBeUndefined();
        })
    }); */

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Product = require('../../models/product.models');
const { response } = require('../../app');


describe('Pruebas sobra la api de productos', () => {


    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/tienda-online');
    });

    afterAll(async () => {
        -'' -
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;

        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        })

        it('debería devolver estatus 200', () => {
            expect(response.statusCode).toBe(200);
        });


        it('debería devolver respuesta en formato JSON', () => {
            expect(response.headers['content-type']).toContain('application/json')
        });

        it('Debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });


    });

    describe('POST /api/products', () => {

        let response;

        const newProduct = {
            name: 'Picadora Moulinex',
            description: 'Para picar cosas',
            price: 23,
            department: 'test',
            available: true,
            created_at: new Date()
        };

        beforeEach(async () => {
            response = await request(app).post('/api/products').send(newProduct);
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' });
        });

        it('Deberia devolver un estatus 201', () => {
            expect(response.statusCode).toBe(201);
        });

        it('Deberia devolver una respuesta en formato JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        // Comprobar si el id viene definido
        // Comprobar si alguno de los datos que estamos insertando nos es devuelto en la res.

        it('Deberia insertar el producto en la BD', () => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newProduct.name);
        });
    });

    describe('POST con validaciones /api/products/', () => {

        it('Deberia devolver error si no recibe el name', async () => {
            const response = await request(app).post('/api/products').send({
                description: 'lo que sea',
                price: 123,
                department: 'test',
                available: true,
                created_at: '2022-09-10'
            });

            expect(response.body.name).toBeDefined();
            expect(response.body.name.msg).toBe('El campo nombre es requerido')
        })

        it('deberia devolver error si el name es menor de 3 caracteres', async () => {
            const response = await request(app).post('/api/products').send({
                name: 'as',
                description: 'lo que sea',
                price: 123,
                department: 'test',
                available: true,
                created_at: '2022-09-10'
            });

            expect(response.body.name).toBeDefined();
            expect(response.body.name.msg).toBe('el campo nombre debe tener minimo 3')
        });

        it('deberia devolver error si no esta disponible el producto', async () => {
            const response = await request(app).post('/api/products').send({
                name: 'Prueba', description: 'lo que sea', price: 123, department: 'test', available: false, created_at: '2022-09-10'
            })

            expect(response.body.available).toBeDefined();
            expect(response.body.available.msg).toBe('las inserciones debene estar disponibles');

        })


    });

    describe('PUT /api/products/IDPRODUCT', () => {

        let response;
        let productoCreado

        const newProduct = {
            name: 'Picadora Moulinex',
            description: 'Para picar cosas',
            price: 23,
            department: 'test',
            available: true,
            created_at: new Date()
        }

        const cambios = {
            price: 100,
            department: 'otro'
        }

        beforeEach(async () => {

            productoCreado = await Product.create(newProduct);
            response = await request(app).put('/api/products/' + productoCreado._id).send(cambios);

        });

        afterEach(async () => {
            Product.findByIdAndDelete(productoCreado._id);
        })





        it('Deberia devolver estatus 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('Deberia devolver una respuesta JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        })

        it('Deberia devolver los datos actualizados', () => {
            expect(response.body.price).toBe(cambios.price)
            expect(response.body.department).toBe(cambios.department)
        })


    })

    describe('DELETE /api/products/IDPRODUCT', () => {
        const newProduct = {
            name: 'Picadora Moulinex',
            description: 'Para picar cosas',
            price: 23,
            department: 'test',
            available: true,
            created_at: new Date()
        }

        let response;
        let producto;

        beforeEach(async () => {
            producto = await Product.create(newProduct);
            response = await request(app).delete('/api/products/' + producto._id).send();

        });

        afterEach(async () => {
            await Product.deleteMany({ name: 'Picadora Moulinex' })
        })

        it('Deberia devolver estatus 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('Deberia devolver un objeto JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });


        it('Deberia estar creado el producto en la BD', async () => {
            const productDB = await Product.findById(producto._id)
            expect(productDB).toBeNull
        });




    })


});

