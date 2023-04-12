import mongoose from 'mongoose';

const consultaSchema = new mongoose.Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Funcionario',
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Paciente',
  },
  dataConsulta: {
    type: Date,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  receita: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Receita',
  },
});

consulta.index({medico:1, paciente:1, dataConsulta:1}, {unique:true});

const consulta = mongoose.model('Consulta', consultaSchema);

export default consulta;
