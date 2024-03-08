import express from 'express'
import { ValidarJWT, isAdmin } from "../middlewares/validacion-jwt.js"
import { compra, historial } from './compre.controller.js'

const api = express.Router()

api.post('/Comprar',[ValidarJWT], compra)
api.get('/historial',[ValidarJWT],historial)

export default api