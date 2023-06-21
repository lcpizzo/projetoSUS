import mongoose from 'mongoose';
import Consulta from '../models/consulta.js';
// const Consulta = mongoose.model('Consulta');

const consultaControllers = {
  // cria uma consulta POST
  post: async (req, res, next) => {
    try {
      let dados = req.body;
      
      /*validar dados de entrada*/

      console.log(Date.parse(dados.codigo.dataConsulta));

      let consulta = new Consulta(dados);
      
      await consulta.save();
      res.status(201).send({
        message: 'Consulta cadastrado com sucesso!',
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: 'Falha ao processar requisição',
        data: e,
      });
    }
  },

  getAll: async (req, res, next) => {
    async function findAllConsultas() {
      const cursor = Consulta.find({});

      return cursor;
    }

    try {
      const data = await findAllConsultas();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição',
      });
    }
  },

  /*
  // retorna todas as consultas de um determinado paciente
  getByPatient: async (req, res, next) => {
    // retorna todas as consultas de um determinado paciente
    async function findByPatient(patient) {
      console.log(patient);
      const cursor = Consulta.find({
        codigo:{ paciente: patient},
      });

      console.log(cursor);

      return results;
    }

    try {
      const data = await findByPatient({
        patient: req.body.codigo.paciente,
      });
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByPatient',
        erro: e
      });
    }
  },*/

  
  // retorna todas as consultas de um determinado paciente
  getByPatient: async (req, res, next) => {
    // retorna todas as consultas de um determinado paciente
    async function findByPatient(patient) {
      let pacientes = await Consulta.find({});

      let paciente = pacientes.filter(consulta => 
        consulta.codigo.paciente == patient);

      return paciente;
    }

    try {
      const data = await findByPatient(req.body.codigo['paciente']);

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByPatient',
        erro: e
      });
    }
  },

  // cria multiplos objetos consulta
  // async function createMultipleAppointments(client, newAppointments) {
  //   let consulta = new Consulta({
  //     codigo: {
  //       medico: 'pazuelo',
  //       paciente: 'jun',
  //       dataConsulta: '11/06/2023',
  //     },
  //     dadosReceita: ['cloroquina', 'ivermectina'],
  //   });
  //   await consulta.save();

  //   // const result = await client.db('test').collection('consultas').insertMany(newAppointments);

  //   // console.log(`${result.insertedCount} new appointments(s) created with the following id(s):`);
  //   // console.log(result.insertedIds);
  // }

  // retorna consulta buscada pela tupla (medico, paciente, data)
  getByTuple: async (req, res, next) => {
    // retorna consulta buscada pela tupla (medico, paciente, data) - isso vai ser mudado para a funcao abaixo getByTuple
    async function findOneAppointmentByTuple(data) {
      const result = await Consulta.findOne({
        
          medico: data.medico,
          paciente: data.paciente,
          dataConsulta: data.dataConsulta
    });

      return result;
    }

    try {
      const data = await findOneAppointmentByTuple(req.body.codigo);
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByConsulta',
      });
    }
  },

  //atualizar uma determinada consulta
  put: async (req, res, next) => {
    //atualizar uma determinada consulta
    async function updateAppointmentByTuple(doctor, patient, date, newAppointment) {
      const result = await Consulta.updateOne(
        {
          'codigo.medico': doctor,
          'codigo.paciente': patient,
          'codigo.dataConsulta': date,
        },
        { $set: newAppointment }
      );
    }
    try {
      await updateAppointmentByTuple(
        {
          doctor: req.body.doctor,
          patient: req.body.patient,
          date: req.body.date,
        },
        req.body.newAppointment
      );
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição',
      });
    }
  },

  delete: async (req, res, next) => {
    // excluir uma consulta especifica
    async function deleteAppointmentByTuple(doctor, patient, date) {
      const result = await Consulta.deleteOne({
        'codigo.medico': doctor,
        'codigo.paciente': patient,
        'codigo.dataConsulta': date,
      });
    }

    try {
      await deleteAppointmentByTuple({
        doctor: req.body.doctor,
        patient: req.body.patient,
        date: req.body.date,
      });
      res.status(200).send({
        message: 'Consulta removido com sucesso!',
      });
    } catch (e) {
      res.status(400).send({
        message: 'Falha ao remover consulta',
        data: e,
      });
    }
  },
};

export default consultaControllers;
