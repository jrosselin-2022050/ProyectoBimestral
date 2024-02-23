'use strict'
import Categoria from './categorias.model.js'

//Nueva categoooria
export const nuevo = async (req, res) => {
    try {
        let data = req.body
        let catego = new Categoria(data)
        await catego.save()
        return res.status(200).send({message: 'La categoria se guardo correctamente'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error al guardar la categoria'})
    }
}

export const buscar = async (req, res) => {
    try {
        let { id } = req.params
        let catalogo = await Categoria.findOne({ _id: id })
        return res.status(200).send({ catalogo })

    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'El producto no se encontrado' })
    }
}

export const listar = async(req, res)=>{
    try{
        let catalogo = await Categoria.find()
        return res.status(200).send({message: `Estas son todas las categorias existentes: `, catalogo})
    }catch(err){
        console.error(err);
    }
}

export const actualizar = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let actualizar = await  Categoria.findOneAndUpdate({ _id: id }, data, { new: true })
        if (!actualizar) return res.status(401).send({ message: 'La categoria no se pudo actualizar correctamente' })
        return res.status(200).send({ message: 'La categoria se actualizo correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({meessage:'Error al actualizar'})
    }
}

export const eliminar = async (req, res)=>{
    try{
        let {id} = req.params
        let eliminar = await Categoria.findOneAndDelete({_id: id})
        if(!eliminar) return res.status(404).send({message:'Categoria no encontrada'})
        return res.status(200).send({message: 'Categoria eliminada correctamente'})

    }catch(err){
        console.error(err);
    }
}