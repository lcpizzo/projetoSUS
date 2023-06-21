import express from 'express';
import receitaController from '../controller/receita.js';
const router = express.Router();

router.post('/', receitaController.post)
    .get('/', receitaController.getAll)
    .get('/:codigo', receitaController.findPrescriptionByCode)
    .get('/:paciente', receitaController.findPrescriptionByPatient)
    .put('/:codigo', receitaController.updatePrescriptionByCode)
    .delete('/:codigo', receitaController.deletePrescriptionByCode);

export default router;