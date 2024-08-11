import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class IvasTratamento extends Model {
  public TratamentoID!: number;
  public Tratamento!: string;
  public Descricao!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

IvasTratamento.init({
  TratamentoID: {
    type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
  },
	Tratamento: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: true
  },
  Descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, { sequelize, tableName: "ivas_Tratamento", timestamps: false });

export default IvasTratamento;