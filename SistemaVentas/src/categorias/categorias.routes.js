'use strict'
import { Router } from "express"
import { actualizar, buscar, eliminar, listar, nuevo } from "./categorias.controller.js"

const api = Router()

api.post('/NuevaCategoria', nuevo)
api.put('/ActualizarCategoria/:id', actualizar)
api.delete('/EliminarCategorias/:id', eliminar)
api.get('/ListarCategorias', listar)
api.get('/BuscarCategoria/:id', buscar)


export default api