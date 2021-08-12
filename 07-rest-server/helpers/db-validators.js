
const { Categoria, Usuario } = require('../models');
const Role = require('../models/role')

const esRoleValido =  async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const emailExiste = async (correo = '') => {
        // Verificar si el correo existe
        const existeEmail = await Usuario.findOne({correo})
        if( existeEmail ){
            throw new Error(`El correo ${correo} ya esta registrado`)
        }
}

const userIdExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario ){
        throw new Error(`El id ${id} no existe`)
    }
}


const existeCategiriaPorID = async (id) => {
    const existeCategoria = await Categoria.findById(id)
    if( !existeCategoria ){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    userIdExiste,
    existeCategiriaPorID
}