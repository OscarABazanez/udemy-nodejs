const path = require("path");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)


const  subirArchivo = ( files, extensionesValidas  = ['png', 'jpg', 'jpeg','gif'], carpeta='' ) =>{
    return new Promise((resolve, reject) => {
        const { archivo } = files
        const nombreCortado = archivo.name.split('.');
        const extensionArhivo = nombreCortado[nombreCortado.length - 1];
    
        if(!extensionesValidas.includes( extensionArhivo)){
            return reject(`La extension ${extensionArhivo} no es permitida, ${extensionesValidas}`)
        }
    
        const nombreTemporal = uuidv4()+'.'+extensionArhivo
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemporal);
      
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            resolve(nombreTemporal)
        });
    })
}


const  subirArchivoCloudinary = async ( files, extensionesValidas  = ['png', 'jpg', 'jpeg','gif'], carpeta='' ) =>{
    const { archivo } = files
    const nombreCortado = archivo.name.split('.');
    const extensionArhivo = nombreCortado[nombreCortado.length - 1];
        
    if(!extensionesValidas.includes( extensionArhivo)){
        return 12321
    }

    try {
        const { tempFilePath } = archivo
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        return secure_url
    } catch (error) {
        return reject(`Hubo un error al intentar subir el archivo`)
    }

}
module.exports = {
    subirArchivo,
    subirArchivoCloudinary
}