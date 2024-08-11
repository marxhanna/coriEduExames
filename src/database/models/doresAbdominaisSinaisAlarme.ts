import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class DoresAbdominaisSinaisAlarme extends Model {
  public id!: number;
  public Sinal!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

DoresAbdominaisSinaisAlarme.init({
  SinalID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
	Sinal: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, tableName: "dorAbdominal_SinaisAlarme", timestamps: false });

export default DoresAbdominaisSinaisAlarme;