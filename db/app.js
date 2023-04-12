import db from './dbConnect.js';
import medicamento from './models/medicamento.js';
import posto from './models/posto.js';
import funcionario from './models/funcionario.js';
import paciente from './models/paciente.js';
import receita from './models/receita.js';

const port = process.env.PORT || 3000;

db.on("error", console.log.bind(console, "Erro de conexão"));

db.once("open", async function () {
  console.log("Conexão com o banco feita com sucesso");

  
  const input = {
    cod_receita:'aspodfikas´pdofkp',
    validade:'12/12/12',
    medico:'643739f139515c3b2638fdff',
    paciente:'64373a3eeb9d5c052951d49f',
  }
  
  const med = new receita(input);
  
  await med.save();
  
  //const med = await posto.find();
  
  console.log(med);
});

