'use strict'
 import express from 'express'
import { cambioDeRol, editarPerfil, eliminarPerfil, login, registro } from './usuario.controller.js'
import {ValidarJWT, isAdmin} from '../middlewares/validacion-jwt.js'

const api = express.Router()

api.post('/Registro', registro)
api.post('/Login',login)
api.put('/editarPerfil/:id', [ValidarJWT], editarPerfil)
api.delete('/eliminarPerfil/:id', [ValidarJWT], eliminarPerfil)

//Administracion
api.put('/cambioDeRol/:id',[ValidarJWT],[isAdmin], cambioDeRol)

export default api  