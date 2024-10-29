import express from 'express';

const host = '127.0.0.1';
const porta = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./publico'));
app.use(express.static('./privado'));

let interessados = []; 
let filhotes = []; 

// Rota para cadastrar interessados
app.post('/interessados', (req, res) => {
    const interessado = req.body; 
    interessados.push(interessado); 
    res.json({ message: 'Interessado registrado', interessado });
});

// Rota para buscar todos os interessados
app.get('/interessados', (req, res) => {
    res.json(interessados); 
});

// Rota para cadastrar filhotes
app.post('/filhotes', (req, res) => {
    const filhote = req.body; 
    filhotes.push(filhote); 
    res.json({ message: 'Filhote registrado', filhote });
});


app.get('/filhotes', (req, res) => {
    res.json(filhotes); 
});

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
