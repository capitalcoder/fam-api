import { Sequelize, DataTypes } from "sequelize";
import {} from "dotenv/config";

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

// Define Asset model
export const Asset = sequelize.define("Asset", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  productionCode: {
    // Serial number or any number from manufacturer
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
      "Dibuang",
      "Hilang",
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
export const Category = sequelize.define("Category", {
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
export const Location = sequelize.define("Location", {
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
export const Shifting = sequelize.define("Shifting", {
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
export const Supplier = sequelize.define("Supplier", {
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
export const Assignment = sequelize.define("Assignment", {
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
export const Assignee = sequelize.define("Assignee", {
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(Asset);
Location.hasMany(Asset);
Supplier.hasMany(Asset);
Assignee.hasMany(Asset);
Asset.belongsTo(Assignee);

// Sync the model with the database
const syncDatabase = async () => {
  await sequelize.sync();
};

syncDatabase();
