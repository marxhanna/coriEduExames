import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class DoresAbdominaisExame extends Model {
  public ExameID!: number;
  public Exame!: string;
  public Descricao!: string;
  public ExameIcone!: string;
  public ExameImagem!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

DoresAbdominaisExame.init({
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
  },
  ExameIcone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ExameImagem: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, tableName: "dorAbdominal_Exame", timestamps: false, modelName: "Exame" });

export default DoresAbdominaisExame;