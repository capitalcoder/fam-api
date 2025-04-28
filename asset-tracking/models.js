const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_asset", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define Asset model
const Asset = sequelize.define("Asset", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sac: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.BLOB,
    allowNull: true,
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

const Supplier = sequelize.define("Supplier", {
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

const Assignments = sequelize.define("Assignments", {
  asset: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assignment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Returned"),
    allowNull: false,
  },
});

Category.hasMany(Asset);
Location.hasMany(Asset);
Asset.hasOne(Assignments);

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { Category, Location, Supplier, Asset, Assignments, sequelize };
