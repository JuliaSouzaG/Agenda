import express, { Request, Response } from 'express'
import { AgendaRouter } from './router/agenda-router'
//import sequelize from './database/sequelize'

const PORT = 3000
const app = express()

// Middleware para definir o cabeçalho Content-Type em todas as respostas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ou substitua '*' pela origem permitida
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json())
app.get('/api', (req: Request, res: Response) => {
    res.send('Bem vindo a API bancária')
})

const agendaRouter = new AgendaRouter();
app.use("/api/agenda", agendaRouter.Router);

async function initialize() {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        })
    } catch (erro: any) {
        throw new Error('Não foi possível iniciar o servidor de API: ' + erro.message)
    }
}

initialize()