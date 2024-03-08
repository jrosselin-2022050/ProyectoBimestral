import express from 'express'
import { actualizarCarrito, agregarProductos, eliminarCarrito, verCarrito } from './carrito.controller.js'
import { ValidarJWT } from '../middlewares/validacion-jwt.js'

const api = express.Router()


api.post('/agregarAlcarrito/:id',[ValidarJWT], agregarProductos)
api.get('/verCarrito',[ValidarJWT], verCarrito)
api.put('/actualizarCarrito/:id', [ValidarJWT], actualizarCarrito)
api.delete('/eliminarCarrito/:id',[ValidarJWT],eliminarCarrito )




export default api