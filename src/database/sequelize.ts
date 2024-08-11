import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "corihealth.com.br",
    username: "mysql",
    password: "b*nd1nh4",
    database: "corihealth",
} /*{
    dialect: "mysql",
    host: "localhost",
    username: "cori_health",
    password: "123456",
    database: "cori",
}*/);

try {
    sequelize.authenticate().then(msg => {
        console.log(msg)
    })
} catch (error) {
    console.log(error)
}

export default sequelize;