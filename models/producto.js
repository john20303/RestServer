const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectID,
        ref: "Usuario",
        required: true,
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectID,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }

});


// Con esta función lo que hacemos es desestructurar lo que queremos obviar al mostrar la data.
ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...producto } = this.toObject();
    return producto;
}


module.exports = model('Producto', ProductoSchema)