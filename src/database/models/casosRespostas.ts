import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class CasosRespostas extends Model {
  public CasoID!: number;

  public Resposta1!: string;
  public Resposta2!: string;
  public Resposta3!: string;
  public Resposta4!: string;
  public Resposta5!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CasosRespostas.init({
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CasoID: {
    type: DataTypes.INTEGER,
  },
  Resposta1: {
    type: DataTypes.TEXT,
  },
  Resposta2: {
    type: DataTypes.TEXT,
  },
  Resposta3: {
    type: DataTypes.TEXT,
  },
  Resposta4: {
    type: DataTypes.TEXT,
  },
  Resposta5: {
    type: DataTypes.TEXT,
  }
}, { sequelize, tableName: "casos_resposta", timestamps: false });

// CasosRespostas.hasMany(CefaleiaExame, { foreignKey: 'Exame', sourceKey: 'Exame' });

export default CasosRespostas;