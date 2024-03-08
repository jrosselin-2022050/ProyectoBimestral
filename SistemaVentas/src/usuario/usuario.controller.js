'use strict'

import Usuario from './usuario.modelo.js'
import { encriptar, verContra, verActualizacion } from '../utils/validaciones.js'
import { generarJWT } from '../utils/jwt.js'

export const porDefecto = async (req, res) => {
    try {
        let existencia = await Usuario.findOne({ username: 'jrosselin-2022050' })
        if (!existencia) {
            let usuarioDefecto = {
                nombre: 'Joshua Elijhab',
                correo: 'jrosselin-2022050@kinal.edu.gt',
                password: 'Megacreeper1$',
                username: 'jrosselin-2022050',
                telefono: '12345678',
                direccion: 'Una casa por mi casa',
                role: 'ADMIN'
            }
            let admin = new Usuario(usuarioDefecto)
            await admin.save()
        }

    } catch (err) {
        console.error(err);
    }
}

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
        let usuario = await Usuario.findOne({ $or: [{ username: username }, { correo: correo }] })
        if (usuario && await verContra(password, usuario.password)) {
            let ingreso = {
                uid: usuario._id,
                username: usuario.username,
                correo: usuario.correo,
                nombre: usuario.nombre,
                role: usuario.role
            }
            let token = await generarJWT(ingreso)
            return res.send({ message: `Bienvenido: ${usuario.nombre}`, ingreso, token })
        }
    } catch (err) {
        console.error(err);
    }
}

export const editarPerfil = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let { uid } = req.user
        if (id != uid) return res.status(401).send({ message: 'no puedes editar este perfil porque no es tuyo' })
        let editar = verActualizacion(data, id)
        if (!editar) return res.status(400).send({ message: 'Haz colocado algunos datos que no se pueden actualizar' })
        let editarUsuario = await Usuario.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!editarUsuario) return res.status(401).send({ message: 'El perfil no se puede editar correctamente' })
        return res.send({ message: 'Perfil actualizado', editarUsuario })
    } catch (err) {
        console.error(err);
        if (err.keyValue.username) return res.status(400).send({ message: `El nombre de usuario:  ${err.keyValue.usuario} Ya esta tomado` })
        return res.status(500).send({ message: 'Error al actualizar' })

    }
}

export const eliminarPerfil = async (req, res) => {
    try {
        let { id } = req.params
        let { uid } = req.user
        if (id != uid) return res.status(401).send({ message: 'no puedes eliminar este perfil porque no es tuyo' })
        let eliminar = await Usuario.findOneAndDelete({ _id: id })
        if (!eliminar) return res.status(404).send({ message: 'No se pudo eliminar' })
        return res.send({ message: 'Eliminado correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el sistema' })
    }
}

export const cambioDeRol = async (req, res) => {
    try {
        let { id } = req.params
        let { uid } = req.user
        let { role } = req.body
        let usuarioADMIN = await Usuario.findOne({ _id: uid })
        if (usuarioADMIN.role != 'ADMIN') return res.status(401).send({ message: 'Debes ser admin para realizar eeste cambio' })
        let CambioRol = await Usuario.findOneAndUpdate({ _id: id }, { role: role }, { new: true })
        if (!CambioRol) return res.status(404).send({ message: 'Usuario no encontrado' })
        return res.send({ message: `El Usuario: ${id} ahora es admin` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' })
    }
}