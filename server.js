import express from 'express';
import config from './config/config.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/users',userRouter);

app.listen(config.port,()=>{
    console.log(`Servidor rodando na porta ${config.port}`)
})