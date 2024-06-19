import { IPessoa } from "../interface/agenda-interface";
// import { AgendaMock } from "../mock/agenda-mock";
import { AgendaModel } from "../model/agenda-model";



export class AgendaService {
    private agendaModel: AgendaModel;


    constructor() {
        this.agendaModel = new AgendaModel();
    }

    //cria uma nova pessoa no banco de dados
    public async criar(pessoa: IPessoa) {
        try {
            await AgendaModel.create({
                id: pessoa.id,
                nome: pessoa.nome,
                telefone: pessoa.telefone,
                email: pessoa.email,
                informacoes: pessoa.informacoes
            });
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //
    public async listarTudo() {
        try {
            const pessoas = await AgendaModel.findAll();
            return pessoas;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
        // return AgendaMock.mockListaAgenda();
    }

    //
    public async listarPorNome(chave: string) {
        const filtro = {
            where: {
                nome: chave,
            }
        }
        try {
            const pessoas = await AgendaModel.findAll(filtro);
            return pessoas;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //
    public async alterar(id: number, item: IPessoa) {
        try {
            const pessoa = await AgendaModel.findByPk(id);
            if (pessoa) {
                pessoa.nome = item.nome;
                pessoa.telefone = item.telefone;
                pessoa.email = item.email;
                pessoa.informacoes = item.informacoes;
                pessoa.save;
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //
    public async excluir(id: number) {
        try {
            const pessoa = await AgendaModel.findByPk(id);
            if (pessoa) {
                pessoa.destroy();
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

}