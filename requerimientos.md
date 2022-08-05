# Creación del CRUD de Productos

- GET /api/products
    - Recuperar todos los productos
        PRUEBAS:
        - Que es estatus de la respuesta sea 200
        - Que el contenido de la respuesta es en formato JSON
        - QUe la respuesta sea un array
        - Que los productos devueltos son un número concreto

- POST /api/products
    - Crear un unico producto

- PUT api/products/IDPRODUCT
    - Actualiza un producto a partir de su ID

- DELETE / api/products/IDPRODUCT
    - Borra un producto a partir de su ID

## PRUEBA PUT /api/products/IDPRODUCT

- Probamos el estatus (200) y el content-type -> Crear la peticion en la app
- Antes de cada prueba generamos un objeto en la BD (¿Cómo generamos el producto?)
- Después de cada prueba borramos dicho objeto (findByIdAndDelete()))
- Antes de cada prueba lanzamos la peticion de actualizacion (PUT /api/products/IDPRODUCT) -> supertest
- En la actualizacion modificamos price y department -> BODY
- Confirmamos si el valor del price y el department ques estamos pasando son los que nos devuelve la ejecucion

## PRUEBA DELETE /api/products/IDPRODUCT

- Antes de cada prueba crear un nuevo producto
- Antes de cada prueba lanzamos la peticion delete
- Probamos 
    - Status y content-type
    - Comprobar en la base de datos si el producto que he creado está o no. (findById)

- Si paso un objeto sin name, me devuelve error
- Si paso un objeto con name menos de 3 caracteres, error
- Si paso available a false, error




# USUARIOS

- Modelo: User -> username, email, password, active (Boolean), role

- RUTA:
    - /api/users/register
        - Recibe a traves del body los datos de un user y lo inserta en la BD



GET api/products/add/IDPRODUCT
- Agrega al usuario que ha hecho login ese producto en concreto

GET api/products/cart
- Recupera los productos del usuario logado

GET api/users/profile
- Recupera el perfil completo del usuario logado. Productos incluidos