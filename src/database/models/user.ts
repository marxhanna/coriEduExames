import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Users extends Model {
	public id!: number;
	public name!: string;
	public email!: string;

  public institution!: string;
  public start_year!: string;
	public crm!: string;
	public area!: string;

  public password!: string;
  public birthdate!: Date;
  public work_institution!: string;
  public phone!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Users.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
  uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
	name: {
		type: DataTypes.STRING,
    allowNull: false
	},
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  work_institution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: true
  },
  start_year: {
    type: DataTypes.STRING,
    allowNull: true
  },
  crm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { sequelize });

export default Users;