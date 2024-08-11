import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class DoresAbdominaisQSD extends Model {
  public ID!: number;
  public QuadranteID!: number;
  public Quadrante!: string;
  public SintomaID!: number;
  public Sintomas!: string;
  public Diagnostico1!: string;
  public Diagnostico2!: string;
  public Diagnostico3!: string;
  public Diagnostico4!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

DoresAbdominaisQSD.init({
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
	QuadranteID: {
    type: DataTypes.INTEGER,
  },
  Quadrante: {
    type: DataTypes.STRING
  },
  SintomaID: {
    type: DataTypes.INTEGER
  },
  Sintomas: {
    type: DataTypes.STRING
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
  }
}, { sequelize, tableName: "dorAbdominal_QSD", timestamps: false });

export default DoresAbdominaisQSD;