'use strict'
import Categoria from './categorias.model.js'
import Producto from '../productos/producto.modelo.js'
import Usuario from '../usuario/usuario.modelo.js'

//Nueva categoooria
export const CategoriaDefecto = async (req, res) => {
    try {
        let exixsteCategoria = await Categoria.findOne({ nombre: 'Productos Generales' })
        if (!exixsteCategoria) {
            let data = {
                nombre: 'Productos Generales',
                descripcion: 'Categoria donde muestran los productos de manera genral'
            }
            let defecto = new Categoria(data)
            await defecto.save()
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el sistema' })
    }
}



export const nuevo = async (req, res) => {
    try {
        let { uid } = req.user
        let usuarioADMIN = await Usuario.findOne({ _id: uid })
        if (usuarioADMIN.role != 'ADMIN') return res.status(401).send({ message: 'Debes ser admin para realizar eeste cambio' })
        let data = req.body
        let catego = new Categoria(data)
        await catego.save()
        return res.status(200).send({ message: 'La categoria se guardo correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al guardar la categoria' })
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

export const listar = async (req, res) => {
    try {
        let catalogo = await Categoria.find()
        return res.status(200).send({ message: `Estas son todas las categorias existentes: `, catalogo })
    } catch (err) {
        console.error(err);
    }
}

export const actualizar = async (req, res) => {
    try {
        let { uid } = req.user
        let usuarioADMIN = await Usuario.findOne({ _id: uid })
        if (usuarioADMIN.role != 'ADMIN') return res.status(401).send({ message: 'Debes ser admin para realizar eeste cambio' })
        let { id } = req.params
        let data = req.body
        let actualizar = await Categoria.findOneAndUpdate({ _id: id }, data, { new: true })
        if (!actualizar) return res.status(401).send({ message: 'La categoria no se pudo actualizar correctamente' })
        return res.status(200).send({ message: 'La categoria se actualizo correctamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ meessage: 'Error al actualizar' })
    }
}

export const eliminar = async (req, res) => {
    try {
        let { id } = req.params;
        //Verifica el usuario sea un Admin
        let { uid } = req.user;
        let usuarioADMIN = await Usuario.findOne({ _id: uid });
        if (usuarioADMIN.role !== 'ADMIN')
            return res.status(401).send({ message: 'Debes ser admin para realizar este cambio' });
        //Mandar los productos a la categoria por defecto
        let defecto = await Categoria.findOne({ nombre: 'Productos Generales' });
        let productos = await Producto.find({ categoria: id });
        if (productos.length > 0) {
            await Producto.updateMany(
                { categoria: id },
                { categoria: defecto.id },
                { upsert: true }
            );
        }
        //Proceso de eliminacion de la categoria
        let eliminar = await Categoria.findOneAndDelete({ _id: id });
        if (!eliminar)
            return res.status(404).send({ message: 'Categoría no encontrada' });

        return res.status(200).send({ message: 'Categoría eliminada correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}


/*export const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar y eliminar la categoría
        const eliminar = await Categoria.findOneAndDelete({ _id: id });
        
        if (!eliminar) {
            return res.status(404).send({ message: 'La categoría no se encontró' });
        }

        // Transferir productos asociados a la categoría eliminada a una categoría predeterminada
        const productosActualizados = await Producto.updateMany({ categoria: id }, { categoria: categoriaPredeterminadaId });
        
        res.status(200).send({ message: 'Categoría eliminada exitosamente', productosActualizados });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
};*/
