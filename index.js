import express from 'express';

const host = '127.0.0.1';
const porta = 4000;
const app = express();

app.use(express.static('./publico'));

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
