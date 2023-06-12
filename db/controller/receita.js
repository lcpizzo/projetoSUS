const { MongoClient } = require('mongodb');
const { default: medicamento } = require('../models/medicamento');

try {
  await client.connect();
  await createMultiplePrescriptions(client, [
    {
      cod_receita: '123',
      receituario: {
        medicamento: { nome: 'dipirona', codigo: '123456', preco: 25.48 },
        frequencia: 2,
        dose: 'comprimido 500 ml',
      },
      validade: '10/06/2024',
      medico: 'muzzi',
      paciente: 'jorge',
    },
    {
      cod_receita: '123456',
      receituario: {
        medicamento: { nome: 'rivotril', codigo: '12356', preco: 25.48 },
        frequencia: 2,
        dose: 'comprimido 500 ml',
      },
      validade: '10/07/2024',
      medico: 'pazuelo',
      paciente: 'jun',
    },
  ]);
} catch (e) {
  console.error(e);
}

// cria multiplos objetos receita
async function createMultiplePrescriptions(client, newPrescriptions) {
  const result = await client.db('test').collection('receitas').insertMany(newPrescriptions);

  console.log(`${result.insertedCount} new prescription(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

// retorna consulta buscada pelo codigo da receita
async function findOnePrescriptionByCod(client, cod_receita_alvo) {
  const result = await client.db('test').collection('receitas').findOne({
    cod_receita: cod_receita_alvo,
  });

  if (result) {
    console.log(`Found a prescription in the collection with the cod ${cod_receita_alvo}:`);
    console.log(result);
  } else {
    console.log(`No prescription found with the cod ${cod_receita_alvo}:`);
  }
}

// retorna todas as receitas de um determinado paciente
async function findByPatient(client, patient) {
  const cursor = client.db('test').collection('receitas').find({
    paciente: patient,
  });

  // Store the results in an array
  const results = await cursor.toArray();

  // Print the results
  if (results.length > 0) {
    console.log(`Found prescription(s) with patient ${patient}:`);
    results.forEach((result, i) => {
      const validade = new Date(result.validade).toDateString();

      console.log();
      console.log(`${i + 1}. medico: ${result.medico}`);
      console.log(`   _id: ${result._id}`);
      console.log(`   paciente: ${result.paciente}`);
      console.log(`   validade: ${validade}`);
      console.log(`   receituario:`);
      results.receituario.forEach((medicamento, id) => {
        console.log(`      medicamento: ${medicamento.medicamento.nome}`);
        console.log(`      frequencia: ${medicamento.frequencia}`);
        console.log(`      dose: ${medicamento.dose}`);
      });
    });
  } else {
    console.log(`No prescriptions found with patient ${patient}:`);
  }
}

//atualizar uma determinada consulta
async function updateAppointmentByCod(client, cod_receita_alvo, newPrescription) {
  const result = await client.db('test').collection('consultas').updateOne(
    {
      cod_receita: cod_receita_alvo,
    },
    { $set: newPrescription }
  );

  if (result) {
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  } else {
    console.log(`No prescription found with the cod ${cod_receita_alvo}:`);
  }
}

// excluir uma consulta especifica
async function deleteAppointmentByCod(client, cod_receita_alvo) {
  const result = await client.db('test').collection('receitas').deleteOne({
    cod_receita: cod_receita_alvo,
  });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
