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
    unique: true,
  },
  productionCode: { // Serial number or any number from manufacturer
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "Tersedia",
      "Sedang Digunakan",
      "Sedang Diperbaiki",
      "Dibuang"
    ),
    allowNull: false,
  },
  warrantyExpireDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  barcode: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING,
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
  updatedBy: {
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
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define location shifting model
const Shifting = sequelize.define("Shifting", {
  shiftDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fromLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignee: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define supplier
const Supplier = sequelize.define("Supplier", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactPerson: {
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
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define assignmnet
const Assignment = sequelize.define("Assignment", {
  assignDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Returned"),
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define assignmnet
const Assignee = sequelize.define("Assignee", {
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(Asset);
Location.hasMany(Asset);
Supplier.hasMany(Asset);
Supplier.hasMany(Asset);
Asset.hasOne(Assignment);
Assignee.hasMany(Assignment);

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();

module.exports = { Category, Location, Supplier, Asset, Assignment, Assignee, Shifting };
