const { MongoClient } = require('mongodb');
const { default: funcionario } = require('../models/funcionario');

try {
  await client.connect();
  await createMultipleListings(client, [
    {
      codigoRegional: '123',
      nome: 'jorge',
      tipo: 'medico',
      cpf: '313.313.545-91',
      uf: 'SP',
    },
    {
      codigoRegional: '1234',
      nome: 'manoel',
      tipo: 'medico',
      cpf: '123.456.789-01',
      uf: 'RJ',
    },
  ]);
} catch (e) {
  console.error(e);
}

// cria multiplos funcionarios
async function createMultipleListings(client, newFuncionarios) {
  const result = await client.db('test').collection('funcionarios').insertMany(newFuncionarios);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

// retorna funcionario conforme busca por seu CRM
async function findOneByCRM(client, crm) {
  const result = await client.db('test').collection('funcionarios').find({
    codigoRegional: crm,
  });

  if (result) {
    console.log(`Found a listing in the collection with the CRM code '${crm}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the CRM code '${crm}'`);
  }
}

// retorna funcionarios conforme busca de estado do pais
async function findEmployeeByState(client, uf) {
  const result = await client.db('test').collection('funcionarios').find({
    uf: uf,
  });

  if (result) {
    console.log(`Found an employee in the collection with the state ('${uf}'):`);
    console.log(result);
  } else {
    console.log(`No employee found with the state ('${uf}')`);
  }
}

// atualiza funcionario conforme seu CRM
async function updateEmployeeInformations(client, crm, newEmployee) {
  const result = await client.db('test').collection('funcionarios').updateOne(
    {
      codigoRegional: crm,
    },
    { $set: newEmployee }
  );

  if (result) {
    console.log(`${result} updated.`);
  } else {
    console.error(`No employee with the CRM code ${crm} found.`);
  }
}

// deleta funcionario conforme seu CRM
async function deleteEmployee(client, crm) {
  const result = await client
    .db('test')
    .collection('funcionarios')
    .deleteOne({ codigoRegional: crm });

  console.log(`${result} deleted`);
}
