const controllerGet = (req, res) => {
    const query = req.query;
    res.json({
        msg: "get-api-Controller",
        query
    });
}

const controllerPost = (req, res) => {
    // const { nombre, apellido } = req.body; // De esta manera hacemos que la petición nos regrese solo lo que queremos.
    const body = req.body;
    res.json({
        msg: "post-api-Controller",
        body
        // nombre,
        // apellido
    });
}

const controllerPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "put-api-Controller",
        id
    });
}

const controllerDelete = (req, res) => {
    res.json({
        msg: "delete-api-Controller"
    });
}

const controllerPatch = (req, res) => {
    res.json({
        msg: "patch-api-Controller"
    });
}


module.exports = {
    controllerGet,
    controllerPost,
    controllerPut,
    controllerDelete,
    controllerPatch
}