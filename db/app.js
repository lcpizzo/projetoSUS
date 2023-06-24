import db from './dbConnect.js';
import express from 'express';

import consultaRoute from './routes/consulta-route.js';
import funcionarioRoute from './routes/funcionario-route.js';
// import medicamentoRoute from './routes/medicamento-route.js';
import pacienteRoute from './routes/paciente-route.js';
// import pedidoRoute from './routes/pedido-route.js';
// import postoRoute from './routes/posto-route.js';
import receitaRoute from './routes/receita-route.js';

const app = express();

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log(`Conexão com o banco na porta ${port} feita com sucesso`);
});

app.use(express.json());

app.use('/funcionario', funcionarioRoute);
app.use('/consulta', consultaRoute);
app.use('/receita', receitaRoute);
// app.use('/medicamento', medicamentoRoute);
app.use('/paciente', pacienteRoute);
// app.use('/pedido', pedidoRoute);
// app.use('/posto', postoRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import mongoose from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';

import Consulta from './models/consulta.js';
import Funcionario from './models/funcionario.js';
import Medicamento from './models/medicamento.js';
import Paciente from './models/paciente.js';
import Pedido from './models/pedido.js';
import Posto from './models/posto.js';
import Receita from './models/receita.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3001;

const start = async () => {
  const app = express();

  const adminOptions = {
    resources: [Receita, Medicamento, Funcionario, Paciente, Pedido, Posto, Consulta],
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();

export default app;
