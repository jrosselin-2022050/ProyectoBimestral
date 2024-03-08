import Compra from './compra.model.js'
import Usuario from '../usuario/usuario.modelo.js'
import Carrito from '../Carrito/carrito.model.js'

export const compra = async (req, res) => {
    try {
        let { uid } = req.user
        let usuario = await Usuario.findById(uid)
        if (!usuario) return res.status(404).send({ message: 'No se encontró el usuario' })
        let carritos = await Carrito.find({ usuario: uid })
        if (!carritos || carritos.length === 0) return res.status(404).send({ message: 'No se encontraron carritos para este usuario' });
        // Crear una compra por cada carrito encontrado
        let compras = await Promise.all(carritos.map(async (carrito) => {
            let nuevaCompra = new Compra({ usuario: usuario._id, carrito: carrito._id })
            return nuevaCompra.save()
        }))

        return res.send({ message: 'Compra realizada con éxito', compras })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' })
    }
}

export const historial = async (req, res) => {
    try {
        let { uid } = req.user
        let usuario = await Usuario.findById(uid)
        if (!usuario) return res.status(404).send({ message: 'No has agregado ningún producto al carrito' })
        let compra = await Compra.find({ usuario: uid }).populate('carrito');
        if (!compra) return res.status(404).send({ message: 'No se encontraron carritos para este usuario' })
        return res.status(200).send({ message: `Estos son los productos en tu carrito:`, compra })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' });
    }
};



