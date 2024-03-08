'use strict'

import jwt from 'jsonwebtoken'

const secreteKey = '@LlaveSecreta@'

export const generarJWT = async (payload) => {
    try {
        return jwt.sign(payload, secreteKey,
        {
            expiresIn: '10h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err);
        return err
    }
}