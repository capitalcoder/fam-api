const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_asset", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define Asset model
const Asset = sequelize.define("Asset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "Available",
      "In Use",
      "Under Maintenance",
      "Disposed"
    ),
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
  },
  barcode: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define category model
const Category = sequelize.define("Category", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  parent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define location model
const Location = sequelize.define("Location", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  parent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { Asset, sequelize };
