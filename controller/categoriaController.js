const Categoria = require('../models/categoria');


// Crear una categoria
const postCrearCategoria = async(req, res) => {

    try {
        // Capitalizamos el nombre de la categoria
        const nombre = req.body.nombre.toUpperCase();

        // válidamos la existencia de una categoria en la base de datos
        const categoriaDB = await Categoria.findOne({ nombre });
        if (categoriaDB) {
            return res.status(400).json({
                ok: false,
                msg: `la categoria ${categoriaDB.nombre} ya existe`
            })
        }
        // Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario.id
        }


        // guardar la data en la base de datos
        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json({
            ok: true,
            categoria
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Error en el server"
        })

    }
}

// Obtener todas las categorias-páginado-total categorias-populate
const getCategoriaAll = async(req, res) => {

    try {
        // Declaramos desde donde queremos ver las categorias en la paginacón
        const { limit = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const categorias = await Categoria.find() // Hacemos la búsqueda de todas las categorias al tiempo
            .populate('usuario', 'nombre')
            .skip(desde) //Desde
            .limit(Number(limit)); //Hasta
        const total = await Categoria.countDocuments(); //=> total <= Guardamos la información de la data en esta variable

        // Válidamos en caso  que no existan categorias
        if (!categorias) {
            return res.status(404).json({
                ok: false,
                msg: "No existen categorias."
            })
        }


        // Respuesta del server con exito
        res.status(200).json({
            total,
            categorias
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al hacer la búsqueda"
        })
    }
}

// traemos una categoria por Id
const getCategoriaById = async(req, res) => {
    try {
        // Desestructuramos el id
        const { id } = req.params;

        // Validamos su el id que viene por la request existe
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        if (!categoria.estado) {
            return res.status(404).json({
                ok: false,
                msg: "la categoria no existe."
            })
        }

        // Creamos la respuesta exitosa.
        res.status(200).json({
            ok: true,
            categoria
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server"
        })
    }
}


// Actualizar una categoria
const putCategoria = async(req, res) => {

    try {

        const { id } = req.params; //tomamos el id que viene en  la request.
        const { estado, usuario, ...data } = req.body;
        data.nombre = req.body.nombre.toUpperCase(); //extremos los datos que no queremos mostrar y lo que si lo guardamos en la variable resto.
        data.usuario = req.usuario;

        // Definimos la data a actualizar.
        const categoria = await Categoria.findByIdAndUpdate(id, data).populate('usuario', 'nombre'); //Con el populate traemos el nombre  
        // Guardamos la data en base de datos
        categoria.save();

        // Respuesta existosa
        res.status(201).json({
            ok: true,
            categoria
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server."
        })
    }
}

// Eliminar categoria
const deleteCategoria = async(req, res) => {

    try {
        const { id } = req.params;
        // Buscamos la categoria  la borramos/le damos el estado false.
        const borrarCategoria = await Categoria.findByIdAndUpdate(id, { estado: false }).populate('usuario', 'nombre');
        // Generamos la respuesta exitosa.
        res.status(200).json(borrarCategoria);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server"
        })
    }

}


module.exports = {
    postCrearCategoria,
    getCategoriaAll,
    getCategoriaById,
    putCategoria,
    deleteCategoria
}