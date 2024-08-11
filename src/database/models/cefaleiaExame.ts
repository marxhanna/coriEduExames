import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import CefaleiaDiagnostico from "./cefaleiaDiagnostico";

class CefaleiaExame extends Model {
  public ExameID!: number;
  public Exame!: string;
  public Descricao!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CefaleiaExame.init({
  ExameID: {
    type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
  },
	Exame: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true
  },
  Descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, { sequelize, tableName: "cefaleia_Exame", timestamps: false });

export default CefaleiaExame;