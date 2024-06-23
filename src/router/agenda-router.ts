import express, { Router } from "express";
import { AgendaController } from "../controller/agenda-controller";


export class AgendaRouter {
    private agendaController!: AgendaController;
    private router: Router;

    constructor() {
        this.agendaController = new AgendaController();
        this.router = express.Router();

        this.router.post('/criar', (req, res) => {
            this.agendaController.criar(req, res);
        });

        this.router.get('/listar', (req, res) => {
            this.agendaController.listar(req, res);
        });

        this.router.put('/alterar', (req, res) => {
            this.agendaController.alterar(req, res);
        });

        this.router.delete('/deletar', (req, res) => {
            this.agendaController.excluir(req, res);
        });
        this.router.get('/listarnome', (req, res) => {
            this.agendaController.listarPorNome(req, res);
        });
    }

    get Router(): Router {
        return this.router;
    }

}