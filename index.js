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


// Registro de usuarios
app.post("/registro", (req, res) => {

    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    usuarios.push({
        id: usuarios.length + 1,
        nombre,
        correo,
        contraseña
    });

    res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });

});


// Inicio de sesión
app.post("/login", (req, res) => {

    const { correo, contraseña } = req.body;

    const usuario = usuarios.find(
        user =>
            user.correo === correo &&
            user.contraseña === contraseña
    );

    if (usuario) {

        res.json({
            mensaje: "autenticación satisfactoria"
        });

    } else {

        res.status(401).json({
            mensaje: "error de autenticación"
        });

    }

});







// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});