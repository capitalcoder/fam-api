const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_maintenance", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define depreciation model
const MaintenanceLogs = sequelize.define("MaintenanceLogs", {
  asset: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maintenance_vendor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maintenance_type: {
    type: DataTypes.ENUM("Preventive", "Corrective"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  schedule_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Scheduled", "Completed", "Pending"),
    allowNull: true,
  },
});

const MaintenanceVendor = sequelize.define("MaintenanceVendor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_person: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { MaintenanceLogs, sequelize };
