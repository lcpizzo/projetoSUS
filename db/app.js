import db from './dbConnect.js';
import express from 'express';

import consultaRoute from './routes/consulta-route.js';
// import funcionarioRoute from './routes/funcionario-route.js';
// import medicamentoRoute from './routes/medicamento-route.js';
// import pacienteRoute from './routes/paciente-route.js';
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

app.use('/consulta', consultaRoute);
// app.use('/funcionario', funcionarioRoute);
// app.use('/medicamento', medicamentoRoute);
// app.use('/paciente', pacienteRoute);
// app.use('/pedido', pedidoRoute);
// app.use('/posto', postoRoute);

app.use('/consulta', consultaRoute);
app.use('/receita', receitaRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
export default app;
