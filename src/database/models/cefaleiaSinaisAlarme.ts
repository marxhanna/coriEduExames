import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class CefaleiaSinaisAlarme extends Model {
  public id!: number;
  public SinalAlarme!: string;
  public Diagnostico1!: string;
  public Diagnostico2!: string;
  public Diagnostico3!: string;
  public Diagnostico4!: string;
  public Diagnostico5!: string;
  public Diagnostico6!: string;
  public Diagnostico7!: string;
  public Diagnostico8!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CefaleiaSinaisAlarme.init({
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
  Diagnostico1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Diagnostico2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico5: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico6: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico7: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Diagnostico8: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize, tableName: "cefaleia_sinaisAlarme", timestamps: false });

export default CefaleiaSinaisAlarme;