import express from 'express';
import consultaControllers from '../controller/consulta.js';
const router = express.Router();

router.post('/', consultaControllers.post)
    .get('/', consultaControllers.getAll)
    .get('/patient', consultaControllers.getByPatient)
    .get('/tuplaConsulta', consultaControllers.getByTuple)
    .put('/', consultaControllers.put)
    .delete('/', consultaControllers.delete);

<<<<<<< HEAD
export default router;
=======
// module.exports = router;

export default router;
>>>>>>> 22eedb85609ddce3ad0e4d497a8e737afaf23552
