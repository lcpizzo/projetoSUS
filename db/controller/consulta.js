const { MongoClient } = require('mongodb');
const Consulta = mongoose.model('Consulta');

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
async function findOneAppointmentByTuple(client, { doctor, patient, date } = {}) {
  const result = await client.db('test').collection('consultas').findOne({
    'codigo.medico': doctor,
    'codigo.paciente': patient,
    'codigo.dataConsulta': date,
  });

  if (result) {
    console.log(
      `Found an appointment in the collection with the tuple ('${doctor}', '${patient}', '${date}'):`
    );
    console.log(result);
  } else {
    console.log(`No appointment found with the tuple ('${doctor}', '${patient}', '${date}'):`);
  }
}

// retorna consulta buscada pela tupla (medico, paciente, data)
exports.getByTuple = async (req, res, next) => {
  try {
    const data = await Consulta.find({
      'codigo.medico': doctor,
      'codigo.paciente': patient,
      'codigo.dataConsulta': date,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};

// minha sugestão com base no código github
exports.getByTuple = async (req, res, next) => {
  try {
    const data = await this.findOneAppointmentByTuple({
      req.params.doctor,
      req.params.patient,
      req.params.date,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};


// retorna todas as consultas de um determinado paciente
exports.getByPatient = async (req, res, next) => {
  try {
    const data = await Consulta.find({
      'codigo.paciente': patient,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};

// minha sugestão
exports.getByPatient = async (req, res, next) => {
  try {
    const data = await this.findByPatient({
      req.params.patient,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};


// // retorna todas as consultas de um determinado paciente
async function findByPatient(client, patient) {
  const cursor = client.db('test').collection('consultas').find({
    'codigo.paciente': patient,
  });

  // Store the results in an array
  const results = await cursor.toArray();

  // Print the results
  if (results.length > 0) {
    console.log(`Found appointment(s) with patient ${patient}:`);
    results.forEach((result, i) => {
      const date = new Date(result.codigo.dataConsulta).toDateString();

      console.log();
      console.log(`${i + 1}. medico: ${result.codigo.medico}`);
      console.log(`   _id: ${result._id}`);
      console.log(`   paciente: ${result.codigo.paciente}`);
      console.log(`   data: ${date}`);
    });
  } else {
    console.log(`No appointments found with patient ${patient}:`);
  }
}

//atualizar uma determinada consulta
exports.put = async(req, res, next) => {
  try {
    const data = await this.updateAppointmentByTuple({
      req.params.doctor,
      req.params.patient,
      req.params.date,
    }, req.body.newAppointment);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }

};

//atualizar uma determinada consulta
async function updateAppointmentByTuple(client, { doctor, patient, date } = {}, newAppointment) {
  const result = await client.db('test').collection('consultas').updateOne(
    {
      'codigo.medico': doctor,
      'codigo.paciente': patient,
      'codigo.dataConsulta': date,
    },
    { $set: newAppointment }
  );

  if (result) {
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  } else {
    console.log(`No appointment found with the tuple ('${doctor}', '${patient}', '${date}'):`);
  }
}

// excluir uma consulta especifica
async function deleteAppointmentByTuple(client, doctor, patient, date) {
  const result = await client.db('test').collection('consultas').deleteOne({
    'codigo.medico': doctor,
    'codigo.paciente': patient,
    'codigo.dataConsulta': date,
  });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

exports.delete = async(req, res, next) => {
  try{
      await this.deleteAppointmentByTuple(
        req.params.doctor,
        req.params.patient,
        req.params.date); 
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