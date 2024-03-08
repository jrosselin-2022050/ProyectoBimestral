import mongoose from "mongoose";

const carritoSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    producto:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    }
    /*,total:{
        type: Number,
        required: false
    }*/
})
export default mongoose.model('carrito', carritoSchema)