const { Router } = require("express");
const { controllerGet, controllerPost, controllerPut, controllerDelete, controllerPatch } = require("../controller/controller");
const router = Router();



router.get('/', controllerGet);

router.post('/', controllerPost);

router.put('/', controllerPut);

router.delete('/', controllerDelete);

router.patch('/', controllerPatch);




module.exports = router;