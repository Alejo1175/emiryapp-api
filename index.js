// Importamos Express para crear la API
const express = require("express");

const app = express();

// Iniciamos el puerto donde se ejecutará el servidor
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Arreglo temporal para almacenar usuarios
let usuarios = [];

// Catálogo inicial de productos

let productos = [
    {
        id: 1,
        nombre: "Ensalada Rusa",
        precio: 12000
    },
    {
        id: 2,
        nombre: "Ensalada Hawaiana",
        precio: 15000
    },
    {
        id: 3,
        nombre: "Ensalada Tropical",
        precio: 18000
    }
];

// Arreglo temporal para almacenar pedidos
let pedidos = [];




// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});