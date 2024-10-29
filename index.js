import express from 'express';

const host = '127.0.0.1';
const porta = 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./publico'));
app.use(express.static('./privado'));


app.get('/interessados', (req, res) => {
    res.json({ message: 'Rota para buscar interessados' });
});

app.post('/filhotes', (req, res) => {
    const tipo = req.body;
    res.json({ message: 'Filhote registrado', tipo });
});


app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
