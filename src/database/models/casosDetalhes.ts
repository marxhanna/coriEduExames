import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import CefaleiaExame from "./cefaleiaExame";
import CasosRespostas from "./casosRespostas";

class CasosDetalhes extends Model {
  public CategoriaID!: number;
  public CasoID!: number;
  public bloco1!: string;
  public bloco2!: string;
  public bloco3!: string;
  public bloco4!: string;
  public bloco5!: string;
  public bloco6!: string;
  public Imagem!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CasosDetalhes.init({
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CasoID: {
    type: DataTypes.INTEGER,
  },
  bloco1: {
    type: DataTypes.TEXT,
  },
  bloco2: {
    type: DataTypes.TEXT,
  },
  bloco3: {
    type: DataTypes.TEXT,
  },
  bloco4: {
    type: DataTypes.TEXT,
  },
  bloco5: {
    type: DataTypes.TEXT,
  },
  bloco6: {
    type: DataTypes.TEXT,
  },
  Imagem: {
    type: DataTypes.STRING,
  }
}, { sequelize, tableName: "casos_detalhes", timestamps: false });

CasosDetalhes.hasMany(CasosRespostas, { foreignKey: 'CasoID', sourceKey: 'ID' });

export default CasosDetalhes;