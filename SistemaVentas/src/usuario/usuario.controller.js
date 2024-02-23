'use strict'

import Usuario from './usuario.modelo.js'
import { encriptar, verContra } from '../utils/validaciones.js'

export const registro = async (req, res) => {
    try {
        let data = req.body
        data.password = await encriptar(data.password)
        data.role = 'USER'
        let registro = new Usuario(data)
        await registro.save()
        return res.status(200).send({ message: 'Registrado correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al registrar' })
    }
}

export const login = async (req, res) => {
    try {
        let { username, correo, password } = req.body
        let usuario = await Usuario.findOne( {$or: [{ username: username}, {correo: correo }]}  )
        if (usuario && await verContra(password, usuario.password)) {
            let ingreso = {
                uid: usuario._id,
                username: usuario.username,
                correo: usuario.correo,
                nombre: usuario.nombre,
                role: usuario.role
            }
            //Token va a aqui

            return res.send({message: `Bienvenido: ${usuario.nombre}`, ingreso})
        }
    } catch (err) {
        console.error(err);
    }
}