import db from './dbConnect.js'
import express from "express";
import cors from 'cors';

const port = process.env.PORT || 3000;

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});