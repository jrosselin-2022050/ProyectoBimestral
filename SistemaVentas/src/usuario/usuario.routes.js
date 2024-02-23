'use strict'
 import express from 'express'
import { login, registro } from './usuario.controller.js'

const api = express.Router()

api.post('/Registro', registro)
api.post('/Login', login)

export default api  