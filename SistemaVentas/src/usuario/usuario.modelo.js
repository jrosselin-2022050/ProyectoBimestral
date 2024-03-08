import mongoose from 'mongoose'

const usuarioSchema =  mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'La contraseña debe ser de 8 o mas caracteres'],
        required: true
    },
    username:{
        type:String,
        required: true
    },
    telefono:{
        type:String,
        minLength: 8,
        maxlength: 8,
        required: true
    },
    direccion:{
        type:String,
        required: true
    },
    role: {
        type: String,
        upppercase: true,
        enum: ['ADMIN', 'USER'],
        required: true
    }
})

export default mongoose.model('usuario', usuarioSchema)