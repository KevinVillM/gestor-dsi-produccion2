const { response } = require('express');
const Usuario = require('../models/usuario');

const claudinary = require('cloudinary').v2;
claudinary.config(process.env.CLOUDINARY_URL);



const actualizarImagenClaudinary = async (req, res = response) => {
const { id } = req.params;

let usuario = await Usuario.findById(id);

    //Limpiar imágenes previas
    if (usuario.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = usuario.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        claudinary.uploader.destroy(public_id);
    }


    //Subir a cloudinary en la carpeta usuarios
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await claudinary.uploader.upload(tempFilePath, { folder: 'usuarios' });

   usuario.img = secure_url;

    await usuario.save();

    //Mostrar en consola el archivo cargado 
    console.log(req.body);

    res.json({
        usuario
    });
}


module.exports = {
    actualizarImagenClaudinary
}