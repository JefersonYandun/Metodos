

const express = require('express');
const app = express();
const port = 3000;

// Simulación de una base de datos de productos
let productos = [
    { id: 1, nombre: 'Producto A', precio: 10.0 },
    { id: 2, nombre: 'Producto B', precio: 15.0 },
];

// formato JSON
app.use(express.json());

// ruta formato (GET)
app.get('/productos', (req, res) => {
    res.json(productos);
});

const body=require('body-parser');
app.use(body.urlencoded({extended:true}));


// Ruta  nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para eliminar un producto  ID (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    productos = productos.filter(producto => producto.id !== id);
    res.status(204).send(); // Respuesta exitosa sin contenido
});

// Iniciar el servidor
app.listen(3000, () => { // Utiliza `app` para iniciar el servidor
    console.log("El servidor está ejecutándose en el puerto 3000");
});

