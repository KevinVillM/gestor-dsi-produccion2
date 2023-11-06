//Crear un modelo de base de datos para las notificaciones
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificacionSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    },
    tarea: {
        type: Schema.Types.ObjectId,
        ref: 'Tarea',
        required: false
    },
    leida: {
        type: Boolean,
        required: true,
        default: false
    }
});

NotificacionSchema.methods.toJSON = function(){
    const {__v, _id, ...notificacion} = this.toObject();
    notificacion.uid = _id;
    return notificacion;
}

module.exports = mongoose.model('Notificacion', NotificacionSchema);