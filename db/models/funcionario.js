import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema({
  codigoRegional: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    // montar uma regex para validar as entradas
  },
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['farmaceutico', 'medico'],
  },
  cpf: {
    type: String,
    required: true,
    //match:'/([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\.?-?[0-9]{2})/',
  },
  uf: {
    type: String,
    //match: '/[A-Z]{2}/',
  },
});

// define uma chave composta de codigo regional e uf
funcionarioSchema.index({ codigoRegional: 1, uf: 1 }, { unique: true });

const funcionario = mongoose.model('Funcionario', funcionarioSchema);

export default funcionario;
