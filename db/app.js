import db from './dbConnect.js';
import medicamento from './models/medicamento.js';
import express from 'express';
// const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log(`Conexão com o banco na porta ${port} feita com sucesso`);
});

// const Consulta = require('./models/consulta.js');
// const Funcionario = require('./models/funcionario.js');
// const Medicamento = require('./models/medicamento.js');
// const Paciente = require('./models/paciente.js');
// const Pedido = require('./models/pedido.js');
// const Posto = require('./models/posto.js');
// const Receita = require('./models/receita.js');

// const consultaRoute = require('./routes/consulta-route.js');
import consultaRoute from './routes/consulta-route.js';
// import Consulta from './models/consulta.js';

app.use(express.json());

app.use('/consulta', consultaRoute);

// module.exports = app;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
export default app;