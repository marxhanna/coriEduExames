import exame from "./models/cefaleiaExame";
import sinais from "./models/cefaleiaSinaisAlarme";
import Users from "./models/user";
import sequelize from "./sequelize"

const a = async () => {
  [ Users, exame, sinais ]
  const msg = await sequelize.sync({ alter: true, logging: true });

  console.log(msg)
};

a();