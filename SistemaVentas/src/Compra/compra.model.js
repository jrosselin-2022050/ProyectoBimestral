import mongoose from "mongoose";

const compraSchema = mongoose.Schema({
    usuario:{
        type:mongoose.Schema.ObjectId,
        required: true
    },
    carrito:{
        type:mongoose.Schema.ObjectId,
        required: true
    }
    
})

export  default mongoose.model('Compra', compraSchema)