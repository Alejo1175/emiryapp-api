// Importamos Express para crear la API
const express = require("express");

// Importamos MySQL
const mysql = require("mysql2");

const app = express();

// Puerto del servidor
const PORT = 3000;

// Permite recibir datos JSON
app.use(express.json());

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "emiryapp"
});

// Verificamos la conexión
conexion.connect((error) => {

    if (error) {
        console.log("Error de conexión:", error);
        return;
    }

    console.log("Conectado a MySQL");

});


// ==========================================
// REGISTRO DE USUARIOS
// ==========================================

app.post("/registro", (req, res) => {

    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {

        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });

    }

    const sql =
        "INSERT INTO usuarios(nombre, correo, contraseña) VALUES (?, ?, ?)";

    conexion.query(
        sql,
        [nombre, correo, contraseña],
        (error) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al registrar usuario"
                });

            }

            res.status(201).json({
                mensaje: "Usuario registrado correctamente"
            });

        }
    );

});


// ==========================================
// LOGIN
// ==========================================

app.post("/login", (req, res) => {

    const { correo, contraseña } = req.body;

    const sql =
        "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";

    conexion.query(
        sql,
        [correo, contraseña],
        (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error de autenticación"
                });

            }

            if (resultados.length > 0) {

                res.json({
                    mensaje: "autenticación satisfactoria"
                });

            } else {

                res.status(401).json({
                    mensaje: "error de autenticación"
                });

            }

        }
    );

});


// ==========================================
// ACTUALIZAR USUARIO
// ==========================================

app.put("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const { nombre, correo } = req.body;

    const sql =
        "UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?";

    conexion.query(
        sql,
        [nombre, correo, id],
        (error, resultado) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al actualizar usuario"
                });

            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });

            }

            res.json({
                mensaje: "Usuario actualizado correctamente"
            });

        }
    );

});


// ==========================================
// ELIMINAR USUARIO
// ==========================================

app.delete("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const sql =
        "DELETE FROM usuarios WHERE id = ?";

    conexion.query(
        sql,
        [id],
        (error, resultado) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al eliminar usuario"
                });

            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });

            }

            res.json({
                mensaje: "Usuario eliminado correctamente"
            });

        }
    );

});


// ==========================================
// CONSULTAR PRODUCTOS
// ==========================================

app.get("/productos", (req, res) => {

    conexion.query(
        "SELECT * FROM productos",
        (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al consultar productos"
                });

            }

            res.json(resultados);

        }
    );

});


// ==========================================
// ACTUALIZAR PRODUCTO
// ==========================================

app.put("/productos/:id", (req, res) => {

    const id = req.params.id;

    const { nombre, precio } = req.body;

    const sql =
        "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?";

    conexion.query(
        sql,
        [nombre, precio, id],
        (error, resultado) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al actualizar producto"
                });

            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });

            }

            res.json({
                mensaje: "Producto actualizado correctamente"
            });

        }
    );

});


// ==========================================
// CREAR PEDIDO
// ==========================================

app.post("/pedidos", (req, res) => {

    const { cliente, producto } = req.body;

    const sql =
        "INSERT INTO pedidos(cliente, producto) VALUES (?, ?)";

    conexion.query(
        sql,
        [cliente, producto],
        (error) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al crear pedido"
                });

            }

            res.status(201).json({
                mensaje: "Pedido creado correctamente"
            });

        }
    );

});


// ==========================================
// CONSULTAR PEDIDOS
// ==========================================

app.get("/pedidos", (req, res) => {

    conexion.query(
        "SELECT * FROM pedidos",
        (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error al consultar pedidos"
                });

            }

            res.json(resultados);

        }
    );

});


// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(`Servidor funcionando en puerto ${PORT}`);

});