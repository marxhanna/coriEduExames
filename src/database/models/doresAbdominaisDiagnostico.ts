import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import DoresAbdominaisExame from "./doresAbdominaisExame";

class DoresAbdominaisDiagnostico extends Model {
  public id!: number;
  public Exame!: string;
  public Diagnostico!: string;
  public Classificacao!: number;

  public DiagnosticoID!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

DoresAbdominaisDiagnostico.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  DiagnosticoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Diagnostico: {
    type: DataTypes.STRING,
  },
	Exame: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true
  },
  Classificacao: {
    type: DataTypes.INTEGER
  }
}, { sequelize, tableName: "dorAbdominal_Diagnostico", timestamps: false });

DoresAbdominaisDiagnostico.hasMany(DoresAbdominaisExame, { foreignKey: 'Exame', sourceKey: 'Exame' });

export default DoresAbdominaisDiagnostico;