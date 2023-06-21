import express from 'express';
import consultaControllers from '../controller/consulta.js';
const router = express.Router();

router.post('/', consultaControllers.post);
router.get('/', consultaControllers.getAll);
router.get('/patient', consultaControllers.getByPatient);
router.get('/tuplaConsulta', consultaControllers.getByTuple);
router.put('/', consultaControllers.put);
router.delete('/', consultaControllers.delete);

// module.exports = router;

export default router;
