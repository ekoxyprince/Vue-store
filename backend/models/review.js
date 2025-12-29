import { database } from "../config/db.js";
import Sequelize from "sequelize";

const Review = database.define(
  "review",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(["pending", "approved"]),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default Review;
