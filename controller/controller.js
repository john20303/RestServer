const controllerGet = (req, res) => {
    res.json({
        msg: "get-api-Controller"
    });
}

const controllerPost = (req, res) => {
    res.json({
        msg: "post-api-Controller"
    });
}

const controllerPut = (req, res) => {
    res.json({
        msg: "put-api-Controller"
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