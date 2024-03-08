'use strict'
import Producto from './producto.modelo.js'
import Categoria from '../categorias/categorias.model.js'
import Usuario from '../usuario/usuario.modelo.js'
import Carrito from '../Carrito/carrito.model.js'

export const nuevo = async (req, res) => {
    try {
        let {uid}= req.user
        let usuarioADMIN = await Usuario.findOne({_id: uid})
        if(usuarioADMIN.role != 'ADMIN') return res.status(401).send({message: 'Debes ser admin para realizar eeste cambio'}) 
        let data = req.body
        let product = new Producto(data)
        await product.save()
        return res.status(200).send({ meessage: 'Prroductto guardado correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al guardar el producto' })
    }
}

export const buscar = async (req, res) => {
    try {
        let { id } = req.params
        let producto = await Producto.findOne({ _id: id })
        return res.status(200).send({ producto })

    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'El producto no se encontrado' })
    }
}

export const BuscarxCategoria = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        data.categoria = id
        let categoria = await Categoria.findOne({ _id: id })
        if (!categoria) return res.status(404).send({ message: 'La categoria que buscas no esta disponible' })
        let producto = await Producto.find({categoria})
        if (!producto) return res.status(404).send({ message: 'El producto que buscas no existe' })
        return res.send({ message:`Productos de la categoria ${data.categoria}:`, producto })
    } catch (err) {
        console.error(err);
    }
}

export const listar = async (req, res) => {
    try {
        let products = await Producto.find()
        return res.send({ message: `Estos son los productos que tenemos:`, products })
    } catch (err) {
        console.error(err);
    }
}

export const actualizar = async (req, res) => {
    try {
        let {uid}= req.user
        let usuarioADMIN = await Usuario.findOne({_id: uid})
        if(usuarioADMIN.role != 'ADMIN') return res.status(401).send({message: 'Debes ser admin para realizar eeste cambio'}) 
        let { id } = req.params
        let data = req.body
        let actualizar = await Producto.findOneAndUpdate({ _id: id }, data, { new: true })
        if (!actualizar) return res.status(401).send({ message: 'El producto no se pudo actualizar correctamente' })
        return res.status(200).send({ message: 'El producto se actualizo correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ meessage: 'Error al actualizar' })
    }
}

export const eliminar = async (req, res) => {
    try {
        let {uid}= req.user
        let usuarioADMIN = await Usuario.findOne({_id: uid})
        if(usuarioADMIN.role != 'ADMIN') return res.status(401).send({message: 'Debes ser admin para realizar eeste cambio'}) 
       
        let { id } = req.params
        let eliminar = await Producto.findOneAndDelete({ _id: id })
        if (!eliminar) return res.status(404).send({ message: 'Producto no encontrado para  poder eliminarlo' })
        return res.status(200).send('Producto eliminado correctamente')
    } catch (err) {
        console.error(err);
    }
}

export const agotados = async (req, res) => {
    try {
        let {uid}= req.user
        let usuarioADMIN = await Usuario.findOne({_id: uid})
        if(usuarioADMIN.role != 'ADMIN') return res.status(401).send({message: 'Debes ser admin para realizar eeste cambio'}) 
        let agotados = await Producto.find({ stock: 0 })
        if (!agotados.length === 0) return res.status(404).send({ message: 'No hay productos agotados' })
        return res.send({ message: 'Estos son los productos que estn agotados', agotados })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en la base de datos' })
    }
}




export const masVendidos = async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
    }
}


