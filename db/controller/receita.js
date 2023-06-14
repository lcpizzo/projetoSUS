const { MongoClient } = require('mongodb');
// const { default: medicamento } = require('../models/medicamento');
const Receita = mongoose.model('receitas');

// cria uma receita post
exports.post =async (req, res, next) => {
  try {
    let receita = new Receita({
      cod_receita: '123',
      receituario: {
        medicamento: { nome: 'dipirona', codigo: '123456', preco: 25.48 },
        frequencia: 2,
        dose: 'comprimido 500 ml',
      },
      validade: '10/06/2024',
      medico: 'muzzi',
      paciente: 'jorge'

    });
    await receita.save();
    res.status(201).send({
      message: 'Receita cadastrada com sucesso!'
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Falha ao processar requisição',
      data: e,
    });
  }
};


// try {
//   await client.connect();
//   await createMultiplePrescriptions(client, [
//     {
//       cod_receita: '123',
//       receituario: {
//         medicamento: { nome: 'dipirona', codigo: '123456', preco: 25.48 },
//         frequencia: 2,
//         dose: 'comprimido 500 ml',
//       },
//       validade: '10/06/2024',
//       medico: 'muzzi',
//       paciente: 'jorge'
//     },
//     {
//       cod_receita: '123456',
//       receituario: {
//         medicamento: { nome: 'rivotril', codigo: '12356', preco: 25.48 },
//         frequencia: 2,
//         dose: 'comprimido 500 ml',
//       },
//       validade: '10/07/2024',
//       medico: 'pazuelo',
//       paciente: 'jun',
//     },
//   ]);
// } catch (e) {
//   console.error(e);
// }

// cria multiplos objetos receita
// async function createMultiplePrescriptions(client, newPrescriptions) {
//   const result = await client.db('test').collection('receitas').insertMany(newPrescriptions);

//   console.log(`${result.insertedCount} new prescription(s) created with the following id(s):`);
//   console.log(result.insertedIds);
// }

// retorna consulta buscada pelo codigo da receita
async function findOnePrescriptionByCod(cod_receita_alvo) {
  const result = await Receita.findOne({
    cod_receita: cod_receita_alvo,
  });

  return result;
}

exports.getByCod = async (req, res, next) => {
  try {
    const data = await this.findOnePrescriptionByCod({
      cod_receita_alvo: req.params.cod_receita_alvo
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};


// retorna todas as receitas de um determinado paciente
async function findByPatient(patient) {
  const cursor = Receita.find({
    paciente: patient,
  });

  // Store the results in an array
  return result;
}

exports.getByPatient = async (req, res, next) => {
  try {
    const data = await this.findByPatient({
      patient:req.params.patient
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }
};


//atualizar uma determinada consulta
async function updateAppointmentByCod(cod_receita_alvo, newPrescription) {
  const result = await Receita.updateOne(
    {
      cod_receita: cod_receita_alvo,
    },
    { $set: newPrescription }
  );
}


exports.put = async(req, res, next) => {
  try {
    const data = await this.updateAppointmentByCod({
      cod_receita_alvo: req.body.cod_receita_alvo
    }, req.body.newPrescription);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição',
    });
  }

};

// excluir uma consulta especifica
async function deleteAppointmentByCod(cod_receita_alvo) {
  const result = await Receita.deleteOne({
    cod_receita: cod_receita_alvo,
  });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

exports.delete = async(req, res, next) => {
  try{
      await this.deleteAppointmentByCod({
        cod_receita_alvo:req.params.cod_receita_alvo
      }); 
      res.status(200).send({
          message: 'Receita removida com sucesso!'
      });
  } catch (e) {
      res.status(400).send({
          message: 'Falha ao remover consulta',
          data: e
      })
  }
};