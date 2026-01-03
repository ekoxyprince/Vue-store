import OrderItem from "../models/orderItem.js";
import Order from "../models/order.js";
import Coupon from "../models/coupon.js";
import catchAsync from "../utils/catchAsync.js";
import { Op } from "sequelize";
import Product from "../models/product.js";
import User from "../models/user.js";

export const createOrder = catchAsync(async (req, res) => {
  const { items, subtotal, coupon } = req.body;
  let total = subtotal;
  const couponDetails = await Coupon.findOne({ where: { code: coupon } });
  if (couponDetails) {
    total =
      Number(subtotal) -
      Number(Number(subtotal) * (Number(coupon.discount) / 100));
    couponDetails.status = "inactive";
    await couponDetails.save();
  }
  const order = await req.user.createOrder({
    subTotal: subtotal,
    total: total,
    coupon,
  });
  for (const item of items) {
    await order.addProduct(item.product.id, {
      through: { quantity: item.quantity },
    });
  }
  //   await OrderItem.bulkCreate(
  //     items.map((item) => ({
  //       orderId: order.id,
  //       productId: item.product.id,
  //       quantity: item.quantity,
  //     }))
  //   );
  for (const item of items) {
    const product = await Product.findByPk(item.product.id);
    if (product) {
      product.stockCount = Number(product.stockCount) - Number(item.quantity);
      await product.save();
    }
  }
  res.status(201).json({
    success: true,
    message: "Order created",
    orderId: order.id,
  });
});

export const getOrders = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        through: { attributes: ["quantity"] },
        include: ["images"],
      },
      {
        model: User,
        as: "user",
        attributes: ["fullname", "email"],
      },
    ],
    limit,
    offset,
  });
  res.status(200).json({
    success: true,
    data: orders,
    meta: {
      page,
      limit,
      totalOrders: await Order.count(),
    },
  });
});

export const updateOrder = catchAsync(async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  await order.update({
    status,
  });
  res.status(200).json({ success: true, message: "updated order" });
});
