import mongoose from 'mongoose';

const codigoAgregadoModel = new mongoose.Schema({
  medico_codigo: {
    type: String,
    required: true,
    ref: 'Funcionario',
  },
  medico: {
    type: String,
    required: true,
  },
  paciente_codigo: {
    type: String,
    required: true,
    ref: 'Funcionario',
  },
  paciente: {
    type: String,
    required: true,
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
  receita_codigo: {
    type: [String],
    ref: 'Receita',
  },
  dadosReceita: {
    type: [String],
  },
});

const consulta = mongoose.model('Consulta', consultaSchema);

export default consulta;
