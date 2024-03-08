'use strict'
import { Router } from "express"
import { buscar, listar, actualizar, eliminar, nuevo, agotados, BuscarxCategoria } from "./producto.controller.js"
import { isAdmin, ValidarJWT } from "../middlewares/validacion-jwt.js"
import {verCarrito} from '../Carrito/carrito.controller.js'

const api = Router()

api.post('/NuevoProducto/:id',[ValidarJWT],[isAdmin],nuevo)
api.put('/ActualizarProducto/:id',[ValidarJWT],[isAdmin], actualizar)
api.delete('/EliminarProducto/:id',[ValidarJWT],[isAdmin], eliminar)
api.get('/buscarProducto/:id', buscar)
api.get('/ListarProductos', listar)
api.get('/buscarPorCategoria/:id',BuscarxCategoria)
api.get('/ProductosAgotados',[ValidarJWT],[isAdmin], agotados)
api.get('/verCarrito/:id',[ValidarJWT], verCarrito)

export default api