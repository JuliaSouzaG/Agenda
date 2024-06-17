import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';



export class AgendaModel extends Model {
    private _id!: number;
    private _nome!: string;
    private _telefone!: string;
    private _endereco!: string;
    private _informacoes!: string;


    get id(): number {
        return this._id;
    }
    get nome(): string {
        return this._nome;
    }
    get telefone(): string {
        return this._telefone;
    }
    get endereco(): string {
        return this._endereco;
    }
    get informacoes(): string {
        return this._informacoes;
    }

    set nome(value: string) {
        this._nome = value;
    }
    set telefone(value: string) {
        this._telefone = value;
    }
    set endereco(value:string) {
        this._endereco = value;
    }
    set informacoes(value:string) {
        this._informacoes = value;
    }

}


AgendaModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        endereco: {
            type: DataTypes.STRING,
        },
        informacoes: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: "agendabd",
        tableName: "tbl_agenda",
        timestamps: false
    }
)