import db from './dbConnect.js';
import medicamento from './models/medicamento.js';

const app = express();

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

const Consulta = require('./models/consulta.js');
const Funcionario = require('./models/funcionario.js');
const Medicamento = require('./models/medicamento.js');
const Paciente = require('./models/paciente.js');
const Pedido = require('./models/pedido.js');
const Posto = require('./models/posto.js');
const Receita = require('./models/receita.js');

const consultaRoute = require('./routes/consulta-route.js');

app.use('/', indexRoute);
app.use('/constulta', consultaRoute);

module.exports = app;
