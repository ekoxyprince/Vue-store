import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import { Op } from "sequelize";

export const dashboardStats = catchAsync(async (req, res) => {
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setUTCHours(23, 59, 59, 999);
  const dayQuery = {
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  };
  const totalCustomers = await User.count({ where: { role: "user" } });
  const totalOrders = await Order.count();
  const totalProducts = await Product.count();
  const customerToday = await User.count(dayQuery);
  const orderToday = await Order.count(dayQuery);
  const productToday = await Product.count(dayQuery);
  res.status(200).json({
    success: true,
    data: {
      totalCustomers,
      totalOrders,
      totalProducts,
      customerToday,
      orderToday,
      productToday,
    },
  });
});
