// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bookmark", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao MySQL com Sequelize!"))
  .catch((err) => console.error("Erro na conexão:", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Modelos sincronizados com o banco"))
  .catch((err) => console.error("Erro ao sincronizar modelos:", err));

module.exports = sequelize;
