import { database } from "../config/db.js";
import Sequelize from "sequelize";

const Order = database.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  subTotal: {
    type: Sequelize.DECIMAL(10, 4),
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL(10, 4),
    allowNull: false,
  },
  coupon: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM(["processing", "delivered", "canceled"]),
    defaultValue: "processing",
  },
});

export default Order;
