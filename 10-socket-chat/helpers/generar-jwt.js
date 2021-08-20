const jwt = require("jsonwebtoken")
const {Usuario} = require('../models')
const generarJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject ) => {
        
        const payload = {uid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se genero el Token')
            }else{
                resolve( token )
            }
        })

    })
}

const comprobarJTW = async (token='') => {
    try {
        if(token.length <10){
            return null
        }
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)
        if(usuario){
            if(usuario.status){
                return usuario
            }else{
                return null
            }
        }else{
            return null
        }
        
    } catch (error) {
        return null
    }
}

module.exports = {
    generarJWT,
    comprobarJTW
}