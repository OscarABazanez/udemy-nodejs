const { request, response } = require("express")


const esAdminRole = (req=request, res=response,next) => {
    if( !req.usuario ){
        return res.status(500).json({msg:"Se quiere verifica el rol sin validar el JWT primero."})
    }

    const { rol, nombre } = req.usuario
    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({msg:`${nombre} no es un administrador`})
    }
    next()
}

const tieneRol = ( ...roles ) => {
    return (req=request, res=response,next) => {
        // console.log(roles, req.usuario.rol)
        if( !req.usuario ){
            return res.status(500).json({msg:"Se quiere verifica el rol sin validar el JWT primero."})
        }
        if( !roles.includes( req.usuario.rol) ){
            return res.status(401).json({msg:`El servicio require uno de estos roles ${roles}`})
        }
        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}