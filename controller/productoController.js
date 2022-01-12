const Producto = require('../models/producto');


// Crear producto
const productoPostController = async(req, res) => {
    try {

        const { estado, usuario, ...body } = req.body;


        // Válidamos la existencia del producto
        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if (productoDB) {
            return res.status(302).json({
                ok: false,
                msg: `El producto ${productoDB.nombre} ya existe`
            });
        }

        // Generar la data a guardar en la base de datos
        const data = {
                ...body,
                nombre: body.nombre.toUpperCase(),
                usuario: req.usuario.id
            }
            // Almacenamos la data para que de guarde en la base de datos
        const producto = new Producto(data)
            // Guardamos la data en la base de datos
        producto.save();


        // Se genera la respuesta existosa
        res.status(201).json({
            ok: true,
            msg: `El producto ${producto.nombre} se creo de manera existosa.`,
            producto
        });


    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error en el server"
        })
    }

    res.json({
        msg: "Desde el crear producto controller."
    })
}



// Get All productos
const productosGetAllController = async(req, res) => {
    try {
        // Declaramos desde donde queremos ver los productos en la paginacón
        const { limit = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const productos = await Producto.find({ estado: true }) // Hacemos la búsqueda de todas las categorias al tiempo, cuyo estado es true.
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(desde) //Desde
            .limit(Number(limit)); //Hasta
        const total = await Producto.countDocuments(); //=> total <= Guardamos la información de la data en esta variable

        // Válidamos en caso  que no existan productos
        if (productos.estado) {
            return res.status(404).json({
                ok: false,
                msg: "No existen productos."
            })
        }

        // Respuesta del server con exito
        res.status(200).json({
            total,
            productos
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al hacer la búsqueda"
        })
    }
}

// GetById productos
const productoGetById = async(req, res) => {
    try {
        // Desestructuramos el id
        const { id } = req.params;

        // Validamos su el id que viene por la request existe
        const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        if (!producto.estado) {
            return res.status(404).json({
                ok: false,
                msg: `El producto ${producto.nombre} ha sido eliminado.`
            })
        }


        // Creamos la respuesta exitosa.
        res.status(200).json({
            ok: true,
            producto
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server"
        })
    }
}


// Put Producto
const productoPut = async(req, res) => {
    try {

        const { id } = req.params; //tomamos el id que viene en  la request.
        const { estado, usuario, ...data } = req.body;

        if (data.nombre) {
            data.nombre = req.body.nombre.toUpperCase(); //extremos los datos que no queremos mostrar y lo que si lo guardamos en la variable resto.
        }
        data.usuario = req.usuario;

        // Definimos la data a actualizar.
        const producto = await Producto.findByIdAndUpdate(id, data);

        // Guardamos la data en base de datos
        producto.save();

        // Respuesta existosa
        res.status(201).json({
            ok: true,
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server."
        })
    }
}


// Delete producto
const productoDelete = async(req, res) => {
    try {
        const { id } = req.params;
        // Buscamos la categoria  la borramos/le damos el estado false.
        const borrarProducto = await Producto.findByIdAndUpdate(id, { estado: false });
        if (!borrarProducto.estado) {
            return res.status(404).json({
                ok: false,
                msg: `El producto ${borrarProducto.nombre} no existe`
            })
        }
        // Generamos la respuesta exitosa.
        res.status(200).json(borrarProducto);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error en el server"
        })
    }
}


module.exports = {
    productoPostController,
    productosGetAllController,
    productoGetById,
    productoPut,
    productoDelete
}