const mongoose = require('mongoose');

const conn = async() => {
    await mongoose
        .connect(process.env.MONGO_DB)
        .then(() => console.log("Conectado a mongoDB atlas."))
        .catch((error) => consol.error(error))
}

module.exports = conn;