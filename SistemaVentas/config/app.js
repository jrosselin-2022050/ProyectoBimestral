//Configuración Express

//Importaciones
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "dotenv"
import ProductRoutes from '../src/productos/producto.routes.js'
import CategoriaRoutes  from '../src/categorias/categorias.routes.js'
import UsuarioRoutes from '../src/usuario/usuario.routes.js'


//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configura el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas
app.use(ProductRoutes)
app.use(CategoriaRoutes)
app.use(UsuarioRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
