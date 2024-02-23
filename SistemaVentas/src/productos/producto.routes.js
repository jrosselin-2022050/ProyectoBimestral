'use strict'
import { Router } from "express"
import { buscar, listar, actualizar, eliminar, nuevo, agotados } from "./producto.controller.js"

const api = Router()

api.post('/NuevoProducto', nuevo)
api.put('/ActualizarProducto/:id', actualizar)
api.delete('/EliminarProducto/:id', eliminar)
api.get('/buscarProducto/:id', buscar)
api.get('/ListarProductos', listar)

api.get('/ProductosAgotados', agotados)

export default api