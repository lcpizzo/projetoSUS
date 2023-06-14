const express = require('express');
const router = express.Route();
const controller = require('../controller/receita');

router.post('/', controller.post);

router.get('/cod', constroller.getByCod);
router.get('/patient', constroller.getByPatient);
router.put('/put', controller.put);
router.delete('/delete', controller.delete);

module.exports = router;
