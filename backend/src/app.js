import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import router from './routes/router.js';

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT;

app.listen(port, () => console.log(`---> Rodando na porta ${port} <---`));


