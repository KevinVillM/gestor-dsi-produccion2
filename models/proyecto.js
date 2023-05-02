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
    create_date: {
        type: Date,
        default: Date.now
    },
    ending_date: {
        type: Date,
        default: Date.now
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