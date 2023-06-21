import express from 'express';
import consultaControllers from '../controller/consulta.js';
const router = express.Router();

router.post('/', consultaControllers.post);
router.get('/', consultaControllers.getAll);
router.get('/patient', consultaControllers.getByPatient);
router.get('/tuplaConsulta', consultaControllers.getByTuple);
router.put('/put', consultaControllers.put);
router.delete('/delete', consultaControllers.delete);

export default router;
