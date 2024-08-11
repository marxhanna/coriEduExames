import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import CasosRespostas from "./casosRespostas";
import CasosDetalhes from "./casosDetalhes";

class CasosCategorias extends Model {
  public CategoriaID!: number;
  public Categoria!: string;
  public CasoID!: number;
  public AutorNome!: string;
  public Funcao!: string;
  public Universidade!: string;
  public CasoTitulo!: string;
  public Preview!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CasosCategorias.init({
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CategoriaID: {
    type: DataTypes.INTEGER,
  },
  Categoria: {
    type: DataTypes.STRING,
  },
  CasoID: {
    type: DataTypes.INTEGER,
  },
  AutorNome: {
    type: DataTypes.STRING,
  },
  Funcao: {
    type: DataTypes.STRING,
  },
  Universidade: {
    type: DataTypes.STRING,
  },
  CasoTitulo: {
    type: DataTypes.STRING,
  },
  Preview: {
    type: DataTypes.TEXT,
  },
}, { sequelize, tableName: "casos_cc", timestamps: false });

CasosCategorias.hasMany(CasosDetalhes, { foreignKey: 'CasoID', sourceKey: 'CasoID' });

export default CasosCategorias;