import Factura from './factura.modelo.js'
import Usuario from '../usuario/usuario.modelo.js'
import Producto from '../productos/producto.modelo.js'
import Carrito from '../Carrito/carrito.model.js'
import Compra from '../Compra/compra.model.js'
import pdfkit from 'pdfkit';
import fs from 'fs';
import { now } from 'mongoose'


export const generafactura = async (req, res) => {
    try {
        let { uid } = req.user
        let usuario = await Usuario.findById(uid)
        if (!usuario) return res.status(404).send({ message: 'No has agregado ningún producto al carrito' })


        let compra = await Compra.find({ usuario: uid })
        if (!compra) return res.status(404).send({ message: 'No tienes ningun interes de comprar algo' })
        let infoCompra = await Promise.all(compra.map(async (compra) => {
            let carrito = await Carrito.findOne({ _id: compra.carrito })
            return carrito
        }))


        let carrito = await Carrito.find({ usuario: uid })
        if (!carrito) return res.status(404).send({ message: 'No se encontraron carritos para este usuario' })
        let infoProdu = await Promise.all(carrito.map(async (carrito) => {
            let product = await Producto.findOne({ _id: carrito.producto })
            return product
        }))
        let facturas =[]

        let nuevaFactura = new Factura({
            fecha: Date(now),
            usuario: usuario._id,
       
            

        });
        await nuevaFactura.save()
       
        // Se envían las facturas
        return res.send({ message: 'Facturas de tus compras', infoProdu})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' })
    }
};

async function generarPDF(factura, pdfPath) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit()

        doc.pipe(fs.createWriteStream(pdfPath))
        doc.text('Factura')
        doc.text(`Fecha: ${factura.fecha}`)
        doc.text(`Usuario: ${factura.usuario}`)
        doc.text(`Compra: ${factura.compra}`)
        doc.text(`Productos: ${factura.producto}`)
        doc.text(`Total: ${factura.total}`)
        // Puedes agregar más detalles de la factura aquí

        doc.end()

        doc.on('finish', () => {
            resolve()
        });

        doc.on('error', (err) => {
            reject(err)
        });
    });
}
