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

// Actualización de usuarios

app.put("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(
        u => u.id === id
    );

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    usuario.nombre =
        req.body.nombre || usuario.nombre;

    usuario.correo =
        req.body.correo || usuario.correo;

    res.json({
        mensaje: "Usuario actualizado correctamente",
        usuario
    });

});

// Eliminación de usuarios
app.delete("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const indice = usuarios.findIndex(
        u => u.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    usuarios.splice(indice, 1);

    res.json({
        mensaje: "Usuario eliminado correctamente"
    });

});


// Consulta del catálogo de productos
app.get("/productos", (req, res) => {

    res.json(productos);

});


// Modificación de productos
app.put("/productos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const producto = productos.find(
        p => p.id === id
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    producto.nombre =
        req.body.nombre || producto.nombre;

    producto.precio =
        req.body.precio || producto.precio;

    res.json({
        mensaje: "Producto actualizado correctamente",
        producto
    });

});

// Creación de pedidos
app.post("/pedidos", (req, res) => {

    const { cliente, producto } = req.body;

    const pedido = {
        id: pedidos.length + 1,
        cliente,
        producto
    };

    pedidos.push(pedido);

    res.status(201).json({
        mensaje: "Pedido creado correctamente",
        pedido
    });

});



// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});