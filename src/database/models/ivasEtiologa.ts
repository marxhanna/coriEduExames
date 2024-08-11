import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import IvasTratamento from "./ivasTratamento";

class IvasEtiologia extends Model {
  public id!: number;
  public Etiologia!: string;
  public Tratamento!: string;
  public Classificacao!: number;

  public EtiologiaID!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

IvasEtiologia.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  EtiologiaID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Etiologia: {
    type: DataTypes.STRING,
  },
	Tratamento: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true
  },
  Classificacao: {
    type: DataTypes.INTEGER
  }
}, { sequelize, tableName: "ivas_Etiologia", timestamps: false });

IvasEtiologia.hasMany(IvasTratamento, { foreignKey: 'TratamentoID', sourceKey: 'EtiologiaID' });

export default IvasEtiologia;