const Sequelize = require('sequelize');

const sequelize = new Sequelize('helpdesk_datastore', 'cpatdev', 'password123', {
  host: 'helpdesk-datastore.cdxpes6le825.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: 'Amazon RDS'
  }
});

module.exports = sequelize;