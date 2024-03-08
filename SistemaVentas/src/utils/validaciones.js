import { hash } from "bcrypt";


export const encriptar = async (password) => {
    try {
        return await hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }


}

export const verContra = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const verActualizacion = (data, IdUsuario)=>{
    if(IdUsuario){
        if(
            Object.entries(data).length == 0 || 
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        )return false
        return true
    }else{
        return false
    }
}
