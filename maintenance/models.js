const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("fam_maintenance", "postgres", "P@ssw0rd", {
  host: "localhost",
  dialect: "postgres",
});

// Define depreciation model
const Maintenance = sequelize.define("Maintenance", {
  asset: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  asset_name: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maintenance_vendor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maintenance_type: {
    type: DataTypes.ENUM("Pencegahan", "Perbaikan"),
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
    allowNull: true,
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "Terjadwal",
      "Selesai",
      "Dalam Pemeliharaan",
      "Dibatalkan"
    ),
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Vendor = sequelize.define("Vendor", {
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

module.exports = { Maintenance, Vendor, sequelize };
