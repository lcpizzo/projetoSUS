import mongoose from 'mongoose';

const codigoAgregadoModel = new mongoose.Schema({
  medico: {
    type: String,
    required: true,
    ref: 'Funcionario',
  },
  paciente: {
    type: String,
    required: true,
    ref: 'Funcionario',
  },
  dataConsulta: {
    type: Date,
    required: true,
  },
});

const consultaSchema = new mongoose.Schema({
  codigo: {
    type: codigoAgregadoModel,
    required: true,
    trim: true,
    unique: true,
  },
  dadosReceita: {
    type: [String],
    ref: 'Receita',
  },
});

const consulta = mongoose.model('Consulta', consultaSchema);

export default consulta;
