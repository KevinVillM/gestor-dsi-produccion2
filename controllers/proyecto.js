const {response} = require('express');
const Proyecto = require('../models/proyecto');

const getProyectos = async (req, res = response) => {
    const proyectos = await Proyecto.find({estado: true}).populate('colaboradores', 'nombre _id');

    res.json({
        msg: 'get API - controlador',
        proyectos
    });
}

//Contar proyectos por usuario
const estadistica = async (req, res = response) => {
    const {id} = req.params;
    const proyectos = await Proyecto.find({estado: true, $or: [{propietario: id}, {colaboradores: id}]}).populate('colaboradores', 'nombre _id');
    const cantidadProyectos = proyectos.length;
    const proyectosEnProceso = await Proyecto.find({estado: true, $or: [{propietario: id}, {colaboradores: id}], estado_Proyecto: 'En proceso'}).populate('colaboradores', 'nombre _id');
    const cantidadProyectosEnProceso = proyectosEnProceso.length;
    const proyectosFinalizados = await Proyecto.find({estado: true, $or: [{propietario: id}, {colaboradores: id}], estado_Proyecto: 'Finalizado'}).populate('colaboradores', 'nombre _id');
    const cantidadProyectosFinalizados = proyectosFinalizados.length;
    const proyectosPendientes = await Proyecto.find({estado: true, $or: [{propietario: id}, {colaboradores: id}], estado_Proyecto: 'No iniciado'}).populate('colaboradores', 'nombre _id');
    const cantidadProyectosPendientes = proyectosPendientes.length;
    res.json({
        msg: 'get API - controlador',
        cantidadProyectos,
        cantidadProyectosEnProceso,
        cantidadProyectosFinalizados,
        cantidadProyectosPendientes
    });
}

const getProyectosPorUsuarioColaborador = async (req, res = response) => {
    const {id} = req.params;
    const proyectos = await Proyecto.find({estado: true, colaboradores: id}).populate('colaboradores', 'nombre _id');

    res.json({
        msg: 'get API - controlador',
        proyectos
    });
}

const getUsuariosColaboradores = async (req, res = response) => {
    const { id } = req.params;

    try {
        const userColab = await Proyecto.find({
            estado: true,
            propietario: id
        }).populate('colaboradores', 'nombre img');

        // Filtrar colaboradores cuyo _id no sea igual al del propietario
        const colaboradores = userColab
            .filter((proyecto) => proyecto.colaboradores.length > 0)
            .map((proyecto) => proyecto.colaboradores.filter((colaborador) => colaborador._id.toString() !== id));

        const colaboradoresArrayLimpio = colaboradores.flat();

        res.json(colaboradoresArrayLimpio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};



const getProyectosPorUsuarioCreador = async (req, res = response) => {
    const {id} = req.params;
    const proyectos = await Proyecto.find({estado: true, propietario: id}).populate('colaboradores', 'nombre _id');


    res.json({
        msg: 'get API - controlador',
        proyectos
    }); 
}

const getProyectosPorUsuario = async (req, res = response) => {
    const {id} = req.params;
    const proyectos = await Proyecto.find({estado: true, $or: [{propietario: id}, {colaboradores: id}]}).populate('colaboradores', 'nombre _id');

    res.json({
        msg: 'get API - controlador',
        proyectos
    });
}

// const getUnProyecto = async (req, res = response) => {
//     const {id} = req.params;
//     const proyecto = await Proyecto.findById(id).populate('colaboradores', 'nombre img');

//     if (!proyecto.estado) {
//         return res.status(400).json({
//             msg: 'El proyecto no existe'
//         });
//     }
//     res.json({
//         nombre: proyecto.nombre,
//         descripcion: proyecto.descripcion,
//         colaboradores: proyecto.colaboradores,
//         fecha_final: proyecto.ending_date,
//         fecha_creacion: proyecto.create_date,
//         estado: proyecto.estado_Proyecto,
//     });
// }

const getUnProyecto = async (req, res = response) => {
    const {id} = req.params;
    const {estado, ...resto} = await Proyecto.findById(id).populate('colaboradores', 'nombre _id');
   /* resto.create_date = cambiarFormatoFecha(resto.create_date);
    resto.ending_date = cambiarFormatoFecha(resto.ending_date);
*/
    if (!estado) {
        return res.status(400).json({
            msg: 'El proyecto no existe'
        });
    }
    res.json({
        msg: 'get API - controlador',
        resto
    });
}



const crearProyecto = async (req, res = response) => {
    const {_id, ...resto} = req.body;
    const proyecto =await new Proyecto(resto).populate('colaboradores', 'nombre');
/*
            //validar formato de fecha dd/mm/aaaa verifica que cada parte este separada por /
            if (!resto.create_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) || !resto.ending_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
                return res.status(400).json({
                    msg: 'El formato de la fecha de creacion no es correcto'
                });
            }

    
    const fechaCreacionFormateada = formatearFecha(create_date);
    const fechaFinalizacionFormateada = formatearFecha(ending_date);
    ending_date = fechaFinalizacionFormateada;
    create_date = fechaCreacionFormateada;
*/
    await proyecto.save();
    res.json({
        msg: 'post API - controlador',
        proyecto
    });
}

const actualizarProyecto = async (req, res = response) => {
    const {id} = req.params;
    const {nombre, descripcion, colaboradores, ending_date,create_date,  estado_Proyecto} = req.body;
/*
        //validar formato de fecha dd/mm/aaaa verifica que cada parte este separada por /
        if (!resto.create_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) || !resto.ending_date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            return res.status(400).json({
                msg: 'El formato de la fecha de creacion no es correcto'
            });
        }

    const fechaCreacionFormateada = formatearFecha(create_date);
    const fechaFinalizacionFormateada = formatearFecha(ending_date);
    ending_date = fechaFinalizacionFormateada;
    create_date = fechaCreacionFormateada;

 */
    const proyecto = await Proyecto.findByIdAndUpdate(id, {nombre, descripcion, colaboradores, ending_date,create_date, estado_Proyecto});
    res.json({
        msg: 'put API - controlador',
        proyecto
    });
}

const eliminarProyecto = async (req, res = response) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'delete API - controlador',
        proyecto
    });
}

//Cambiar el formato de date de mongo a formato dd/mm/aaaa
const cambiarFormatoFecha = (fecha) => {
    const fechaCreacion = new Date(fecha);
    const diaCreacion = fechaCreacion.getDate();
    const mesCreacion = fechaCreacion.getMonth() + 1;
    const anioCreacion = fechaCreacion.getFullYear();
    const fechaCreacionFormateada = `${diaCreacion}/${mesCreacion}/${anioCreacion}`;
    return fechaCreacionFormateada;
    
}

//Funcion que recibe una fecha en formato dd-mm-aaaa y la devuelve en formato date de mongo
const formatearFecha = (fecha) => {
    var partesFecha = fecha.split("-");
    var dia = partesFecha[0];
    var mes = partesFecha[1] - 1; // Restamos 1 al mes, ya que en JavaScript los meses van de 0 a 11
    var anio = partesFecha[2];
    var fecha = new Date(anio, mes, dia);
    return fecha;
}


module.exports = {
    getProyectos,
    getUnProyecto,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto,
    getProyectosPorUsuarioCreador,
    getProyectosPorUsuarioColaborador,
    getProyectosPorUsuario,
    estadistica,
    getUsuariosColaboradores
}