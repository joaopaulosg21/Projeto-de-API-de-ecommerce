import express from 'express';
import config from './config/config.js';

const app = express();

app.use(express.json());

app.listen(config.port,()=>{
    console.log('Servidor rodando')
})