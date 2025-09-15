const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true 
  }
}, {
  tableName: 'livros',
  timestamps: false
});

module.exports = Livro;