'use strict'
import { Router } from "express"
import { actualizar, buscar, eliminar, listar, nuevo } from "./categorias.controller.js"
import { ValidarJWT, isAdmin } from "../middlewares/validacion-jwt.js"

const api = Router()

api.post('/NuevaCategoria',[ValidarJWT],[isAdmin] ,nuevo)
api.put('/ActualizarCategoria/:id',[ValidarJWT],[isAdmin] ,actualizar)
api.delete('/EliminarCategorias/:id',[ValidarJWT],[isAdmin] , eliminar)

api.get('/ListarCategorias', listar)
api.get('/BuscarCategoria/:id', buscar)


export default api