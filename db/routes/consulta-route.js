const express = require('express');
const router = express.Route();
const controller = require('../controller/consulta');

router.post('/', controller.post);

router.get('/patient', constroller.getByPatient);
router.get('/tuplaConsulta', controller.getByTuple);

module.exports = router;
