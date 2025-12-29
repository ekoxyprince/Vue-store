import { database } from "../config/db.js";
import Sequelize from "sequelize";

const Coupon = database.define(
  "coupon",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    expiryDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(["active", "inactive"]),
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default Coupon;
