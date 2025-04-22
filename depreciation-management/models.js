const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_depreciation", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define depreciation model
const DepreciationLogs = sequelize.define("DepreciationLogs", {
  asset_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM(
      "Straight-Line",
      "Reducing Balance",
      "Units of Production"
    ),
    allowNull: false,
  },
  depreciation_value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  period: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  current_value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { DepreciationLogs, sequelize };
