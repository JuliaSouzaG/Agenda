import { IPessoa } from '../interface/agenda-interface'
import { AgendaService } from '../service/agenda-service'
import { Request, Response } from 'express'

export class AgendaController {
    private agendaService: AgendaService

    constructor() {
        this.agendaService = new AgendaService()
    }

    public async criar(req: Request, res: Response) {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: 'O corpo da requisição está vazio' })
            return;
        }

        try {
            console.log(req.body);
            await this.agendaService.criar(req.body)
            res.status(201).json({ message: 'Item criado com sucesso' })
        } catch (erro: any) {
            res.status(500).json({ message: erro.message })
        }
    }

    public async listar(req: Request, res: Response) {
        const agendas = await this.agendaService.listarTudo()
        res.status(200).json(agendas)
    }

    public async listarPorNome(req: Request, res: Response) {
        const nome: string = req.query.nome as string;
        if (!nome) { // se não achar parâmetro 
            res.status(400).json({ message: 'Parâmetro de busca não informado' });
            return
        }

        try {
            const pessoa = await this.agendaService.listarPorNome(nome);
            if (pessoa) {
                res.status(200).json({ pessoa });
            } else {
                res.status(204).json({ message: 'Banco não encontrado ' });
            }

        } catch (erro: any) {
            res.status(500).json({ message: erro.message });
        }
    }

    public async alterar(req: Request, res: Response) {
        //garante que a requisição esteja correta
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' } });
            return;
        }
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição está vazio ou incompleto' } });
            return;
        }

        const id = parseInt(<string>req.query.id);
        const pessoa: IPessoa = req.body

        //trata os erros no servidor
        try {
            await this.agendaService.alterar(id, pessoa);
            res.status(200).json({ message: { type: 'info', description: 'Agência atualizada com sucesso' } });
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message } });
        }
    }

    public async excluir(req: Request, res: Response) {
        //garante que a requisição esteja correta
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' } });
            return;
        }

        const id = parseInt(<string>req.query.id);

        //trata erros no servidor
        try {
            await this.agendaService.excluir(id);
            res.status(200).json({ message: { type: 'info', description: 'Agência excluída com sucesso' } });
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message } });
        }
    }
}
