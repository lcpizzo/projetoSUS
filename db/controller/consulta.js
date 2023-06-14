const { MongoClient } = require('mongodb');
const Consulta = mongoose.model('consultas');

// cria uma consulta POST
exports.post = async (req, res, next) => {
  try {
    let consulta = new Consulta({
      codigo: {
        medico: 'pazuelo',
        paciente: 'jun',
        dataConsulta: '11/06/2023',
      },
      dadosReceita: ['cloroquina', 'ivermectina'],
    });
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
};

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

// retorna consulta buscada pela tupla (medico, paciente, data) - isso vai ser mudado para a funcao abaixo getByTuple
async function findOneAppointmentByTuple(doctor, patient, date ) {
  const result = await Consulta.findOne({
    'codigo.medico': doctor,
    'codigo.paciente': patient,
    'codigo.dataConsulta': date,
  });

  return result;
}

// retorna consulta buscada pela tupla (medico, paciente, data)
exports.getByTuple = async (req, res, next) => {
  try {
    const data = await this.findOneAppointmentByTuple({
      doctor:req.params.doctor,
      patient:req.params.patient,
      date:req.params.date
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};

// // retorna todas as consultas de um determinado paciente
async function findByPatient(patient) {
  const cursor = Consulta.find({
    'codigo.paciente': patient,
  });

  return results;
}

// retorna todas as consultas de um determinado paciente
exports.getByPatient = async (req, res, next) => {
  try {
    const data = await this.findByPatient({
      patient:req.params.patient,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};



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


//atualizar uma determinada consulta
exports.put = async(req, res, next) => {
  try {
    await this.updateAppointmentByTuple({
      doctor:req.body.doctor,
      patient:req.body.patient,
      date:req.body.date
    }, req.body.newAppointment);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }

};

// excluir uma consulta especifica
async function deleteAppointmentByTuple(doctor, patient, date) {
  const result = await Consulta.deleteOne({
    'codigo.medico': doctor,
    'codigo.paciente': patient,
    'codigo.dataConsulta': date,
  });
}

exports.delete = async(req, res, next) => {
  try{
      await this.deleteAppointmentByTuple({
        doctor:req.params.doctor,
        patient:req.params.patient,
        date:req.params.date
      }); 
      res.status(200).send({
          message: 'Consulta removido com sucesso!'
      });
  } catch (e) {
      res.status(400).send({
          message: 'Falha ao remover consulta',
          data: e
      })
  }
};