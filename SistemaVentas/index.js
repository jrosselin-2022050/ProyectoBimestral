//Ejecutar servicios

import { initServer } from './config/app.js'
import {connect} from './config/mongo.js'
import {porDefecto} from './src/usuario/usuario.controller.js'
import {CategoriaDefecto} from './src/categorias/categorias.controller.js'

initServer()
connect()
porDefecto()
CategoriaDefecto()

