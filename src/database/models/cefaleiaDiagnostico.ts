import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import CefaleiaExame from "./cefaleiaExame";

class CefaleiaDiagnostico extends Model {
  public Exame!: string;
  public Diagnostico!: string;
  public Classificacao!: number;

  public DiagnosticoID!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CefaleiaDiagnostico.init({
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
}, { sequelize, tableName: "cefaleia_Diagnostico", timestamps: false });

CefaleiaDiagnostico.hasMany(CefaleiaExame, { foreignKey: 'Exame', sourceKey: 'Exame' });

export default CefaleiaDiagnostico;