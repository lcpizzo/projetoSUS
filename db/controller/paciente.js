const { MongoClient } = require('mongodb');
const { default: paciente } = require('../models/paciente');

try {
  await client.connect();
  await createMultipleListings(client, [
    {
      cpf: '313.313.545-91',
      nome: 'Maria',
      endereco: 'Rua Manoel Nobrega, 1341, apto. 43',
      convenioMedico: 'Unimed',
      idade: '61',
    },
    {
      cpf: '313.313.545-92',
      nome: 'Manuel',
      endereco: 'Rua Manoel Nobrega, 1341, apto. 44',
      convenioMedico: 'Notre Dame',
      idade: '44',
    },
  ]);
} catch (e) {
  console.error(e);
}

// cria multiplos paciente
async function createMultipleListings(client, newPaciente) {
  const result = await client.db('test').collection('pacientes').insertMany(newPaciente);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

// retorna paciente conforme busca por seu CPF
async function findOneByCPF(client, cpf) {
  const result = await client.db('test').collection('pacientes').find({
    cpf: cpf,
  });

  if (result) {
    console.log(`Found a listing in the collection with the CPF code '${cpf}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the CPF code '${cpf}'`);
  }
}

// atualiza funcionario conforme seu CPF
async function updatePatientInformations(client, cpf, newPatient) {
  const result = await client.db('test').collection('pacientes').updateOne(
    {
      cpf: cpf,
    },
    { $set: newPatient }
  );

  if (result) {
    console.log(`${result} updated.`);
  } else {
    console.error(`No patient with the cpf code ${cpf} found.`);
  }
}

// deleta funcionario conforme seu cpf
async function deletePatient(client, cpf) {
  const result = await client.db('test').collection('pacientes').deleteOne({ cpf: cpf });

  console.log(`${result} deleted`);
}
