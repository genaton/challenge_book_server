// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL com Sequelize!'))
  .catch(err => console.error('❌ Erro na conexão:', err));

module.exports = sequelize;