'use strict'
import jwt from 'jsonwebtoken'
import Usuario from '../usuario/usuario.modelo.js'

export const ValidarJWT = async(req,res,next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { uid } = jwt.verify(token,secretKey)
        let user = await Usuario.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.user = user
        req.user.uid = uid
        next()
    }catch(err){
        console.error(err)
        return res.status(498).send({message: 'Invalid token or expired'})
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        let { role, username } = req.user
        if(!role || role != 'ADMIN') return res.status(403).send({message: `You dont have acces | username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorizes role'}) 
    }
}
