const express = require('express');
const router = express.Route();
const controller = require('../controller/consulta');

router.post('/', controller.post);
router.get('/patient', constroller.getByPatient);
router.get('/tuplaConsulta', controller.getByTuple);
router.put('/put', controller.put);
router.delete('/delete', controller.delete);

module.exports = router;
