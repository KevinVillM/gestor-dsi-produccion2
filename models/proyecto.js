const{ Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del proyecto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del proyecto es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    estado_Proyecto: {
        type: String,
        default: 'En proceso'
    },
    porcentaje: {
        type: Number,
        default: 0
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    ending_date: {
        type: Date,
        default: Date.now
    },
    propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El propietario del proyecto es obligatorio']
    },
    colaboradores: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
});

ProyectoSchema.methods.toJSON = function(){
    const {__v, _id, ...proyecto} = this.toObject();
    proyecto.uid = _id;
    return proyecto;
}

module.exports = model('Proyecto', ProyectoSchema);