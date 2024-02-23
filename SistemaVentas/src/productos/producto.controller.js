'use strict'
import Producto from './producto.modelo.js'

export const nuevo = async (req, res) => {
    try {
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
        let product = await Producto.findOne({ _id: id })
        return res.status(200).send({ product })

    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'El producto no se encontrado' })
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

        let agotados = await Producto.find({ stock: 0 })
        if(agotados.length == 0) return res.status(404).send({message:'No hay productos agotados'})
        return res.send({message:'Estos son los productos que estn agotados', agotados })
       
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en la base de datos' })
    }

}

export const masVendidos =async(req, res)=>{
    try{

    }catch(err){
        console.error(err);
    }
}
