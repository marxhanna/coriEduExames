import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class IvasSintomas extends Model {
  public id!: number;
  public SinalAlarme!: string;
  public Etiologia1!: string;
  public Etiologia2!: string;
  public Etiologia3!: string;
  public Etiologia4!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

IvasSintomas.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
	SinalAlarme: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true
  },
  Etiologia1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Etiologia2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Etiologia3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Etiologia4: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, tableName: "ivas_sintomas", timestamps: false });

export default IvasSintomas;