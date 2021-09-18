const { Router } = require("express");
const { controllerGet, controllerPost, controllerPut, controllerDelete, controllerPatch } = require("../controller/controller");
const router = Router();



router.get('/', controllerGet);

router.post('/', controllerPost);

router.put('/:id', controllerPut);

router.delete('/:id', controllerDelete);

router.patch('/:id', controllerPatch);




module.exports = router;