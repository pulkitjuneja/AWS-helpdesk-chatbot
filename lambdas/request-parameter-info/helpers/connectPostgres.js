const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_STRING || 'postgres://localhost:5432/To-Do-App');
console.log('initialized');
module.exports = sequelize;