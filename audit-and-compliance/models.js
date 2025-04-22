const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_audit", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define depreciation model
const AuditLogs = sequelize.define("AuditLogs", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asset_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { AuditLogs, sequelize };
