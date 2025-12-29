import { database } from "../config/db.js";
import Sequelize from "sequelize";

const Product = database.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(14, 4),
      allowNull: false,
    },
    finalPrice: {
      type: Sequelize.DECIMAL(14, 4),
      allowNull: false,
    },
    discount: {
      type: Sequelize.DECIMAL(14, 4),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    details: {
      type: Sequelize.STRING(1024),
      allowNull: true,
    },
    stockCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    brand: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;
