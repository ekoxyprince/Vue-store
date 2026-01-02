import { database } from "../config/db.js";
import Sequelize from "sequelize";

const OrderItem = database.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
