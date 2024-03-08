import Carrito from './carrito.model.js'
import Producto from '../productos/producto.modelo.js'
import Usuario from '../usuario//usuario.modelo.js'

export const agregarProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { uid } = req.user;
        data.usuario = uid;
        const producto = await Producto.findOne({ _id: id });
        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        const carrito = new Carrito({
            producto: id,
            usuario: uid,
            cantidad: data.cantidad
        })
        await carrito.save();
        return res.send({ message: 'Producto agregado al carrito de compras' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el sistema' });
    }
}

export const actualizarCarrito = async (req, res) => {
    try {
        let { uid } = req.user
        let { id } = req.params
        let data = req.body
        let usuario = await Usuario.findOne({ _id: uid })
        if (!usuario) return res.status(404).send({ message: 'usuario no encontraddo' })
        let carrito = await Carrito.findOneAndUpdate({ _id: id }, data, { new: true })
        return res.send({ message: 'El carrito se actualizo:', carrito })
    } catch (err) {
        console.error(err);
    }
}

export const eliminarCarrito = async (req, res) => {
    try {
        let { id } = req.params
        let { uid } = req.user
        let usuario = await Usuario.findOne({ _id: uid })
        if (!usuario) return res.status(404).send({ message: 'No se encontro el dueño del carrito' })
        let carrito = await Carrito.findOneAndDelete({ _id: id })
        if (!carrito) return res.status(404).send({ message: 'No se encontro el carrito' })
        return res.send({ message: 'Pedido eliminado' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'M' })
    }
}

export const verCarrito = async (req, res) => {
    try {
        let { uid } = req.user
        let usuario = await Usuario.findById(uid)
        if (!usuario) return res.status(404).send({ message: 'No has agregado ningún producto al carrito' })
        let carrito = await Carrito.find({ usuario: uid })
        if (!carrito) return res.status(404).send({ message: 'No se encontraron carritos para este usuario' })
        let infoProdu = await Promise.all(carrito.map(async (carrito) => {
            let product = await Producto.findOne({_id:carrito.producto})
            return product
        }))
        return res.status(200).send({ message: `Estos son los productos en tu carrito:`,infoProdu })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' });
    }
};
