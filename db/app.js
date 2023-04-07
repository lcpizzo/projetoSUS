import db from './dbConnect.js';
import medicamento from './models/medicamento.js';

const port = process.env.PORT || 3000;

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

/*const input = {
  nome:'alguma coisa',
  codigo:'codigo1',
}

const med = new medicamento(input);

await med.save();
*/

const med = await medicamento.find();

console.log(med);