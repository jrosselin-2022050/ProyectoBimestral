import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        minLength: 0,
        required:true
    },
    categoria: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: false
    }
})

export default mongoose.model('producto', productoSchema)