import express from 'express'
import { ValidarJWT } from '../middlewares/validacion-jwt.js'
import { generafactura } from './factura.controller.js'

const api   = express.Router()

api.get('/factura',[ValidarJWT], generafactura)
//api.get('/FacturaPDF',[ValidarJWT], generarPDF)
export default api  