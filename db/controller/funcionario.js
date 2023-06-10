const { MongoClient } = require('mongodb');

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
async function findOneByCRM(client, nameOfListing) {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

// retorna funcionarios conforme busca de estado do pais
async function findByState(
  client,
  {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const cursor = client
    .db('test')
    .collection('funcionarios')
    .find({
      bedrooms: { $gte: minimumNumberOfBedrooms },
      bathrooms: { $gte: minimumNumberOfBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maximumNumberOfResults);

  // Store the results in an array
  const results = await cursor.toArray();

  // // Print the results
  // if (results.length > 0) {
  //     console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
  //     results.forEach((result, i) => {
  //         const date = new Date(result.last_review).toDateString();

  //         console.log();
  //         console.log(`${i + 1}. name: ${result.name}`);
  //         console.log(`   _id: ${result._id}`);
  //         console.log(`   bedrooms: ${result.bedrooms}`);
  //         console.log(`   bathrooms: ${result.bathrooms}`);
  //         console.log(`   most recent review date: ${date}`);
  //     });
  // } else {
  //     console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
  // }
}

//
