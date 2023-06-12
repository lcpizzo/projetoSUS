const { MongoClient } = require('mongodb');

try {
  await client.connect();
  await createMultipleAppointments(client, [
    {
      codigo: {
        medico: 'muzzy',
        paciente: 'jorgin',
        dataConsulta: '10/06/2023',
      },
      dadosReceita: ['trembo 1.5mg por semana', 'deca 0.5mg por semana'],
    },
    {
      codigo: {
        medico: 'pazuelo',
        paciente: 'jun',
        dataConsulta: '11/06/2023',
      },
      dadosReceita: ['cloroquina', 'ivermectina'],
    },
  ]);
} catch (e) {
  console.error(e);
}

// cria multiplos objetos consulta
async function createMultipleAppointments(client, newAppointments) {
  const result = await client.db('test').collection('consultas').insertMany(newAppointments);

  console.log(`${result.insertedCount} new appointments(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

// retorna consulta buscada pela tupla (medico, paciente, data)
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

// retorna todas as consultas de um determinado paciente
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
