import mongoose from "mongoose";

const facturaSchema = mongoose.Schema({
    fecha:{
        type:Date,
        required:false
    },
    usuario:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
 
      
        producto:{
            type:mongoose.Schema.ObjectId,
            required:false
        }
  
})

export default mongoose.model('factura', facturaSchema)