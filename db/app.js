import db from './dbConnect.js';
import express from 'express';

import consultaRoute from './routes/consulta-route.js';
import funcionarioRoute from './routes/funcionario-route.js';
import medicamentoRoute from './routes/medicamento-route.js';
import pacienteRoute from './routes/paciente-route.js';
import pedidoRoute from './routes/pedido-route.js';
import postoRoute from './routes/posto-route.js';
import receitaRoute from './routes/receita-route.js';

const app = express();

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log(`Conexão com o banco na porta ${port} feita com sucesso`);
});

<<<<<<< HEAD
app.use(express.json());

app.use('/consulta', consultaRoute);
app.use('/funcionario', funcionarioRoute);
app.use('/medicamento', medicamentoRoute);
app.use('/paciente', pacienteRoute);
app.use('/pedido', pedidoRoute);
app.use('/posto', postoRoute);
=======
// const Consulta = require('./models/consulta.js');
// const Funcionario = require('./models/funcionario.js');
// const Medicamento = require('./models/medicamento.js');
// const Paciente = require('./models/paciente.js');
// const Pedido = require('./models/pedido.js');
// const Posto = require('./models/posto.js');
// const Receita = require('./models/receita.js');

// const consultaRoute = require('./routes/consulta-route.js');
import consultaRoute from './routes/consulta-route.js';
import receitaRoute from './routes/receita-route.js';
// import Consulta from './models/consulta.js';

app.use(express.json());

app.use('/consulta', consultaRoute);
>>>>>>> 22eedb85609ddce3ad0e4d497a8e737afaf23552
app.use('/receita', receitaRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
export default app;
