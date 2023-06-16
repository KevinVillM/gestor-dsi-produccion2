const {Schema, model} = require('mongoose');

const TareaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la tarea es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la tarea es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    estado_Tarea: {
        type: String,
        default: 'En proceso'
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    ending_date: {
        type: Date,
        default: Date.now
    },
    asignados: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: [true, 'El proyecto de la tarea es obligatorio']
    }
});

TareaSchema.methods.toJSON = function(){
    const {__v, _id, ...tarea} = this.toObject();
    tarea.uid = _id;
    return tarea;
}

module.exports = model('Tarea', TareaSchema);
