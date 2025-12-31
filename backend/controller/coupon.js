import Coupon from "../models/coupon.js";
import catchAsync from "../utils/catchAsync.js";
import { Op } from "sequelize";

export const createCoupon = catchAsync(async (req, res) => {
  const { code, discount, expiryDate } = req.body;
  const coupon = await Coupon.create({
    code,
    discount,
    expiryDate,
  });
  res.status(201).json({ success: true, data: coupon });
});
export const getAllCoupons = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const coupons = await Coupon.findAll({ limit, offset });
  const totalCoupons = await Coupon.count();
  res.status(200).json({
    success: true,
    data: coupons,
    meta: {
      totalCoupons,
      page,
      limit,
    },
  });
});

export const updateCoupon = catchAsync(async (req, res) => {
  const { code, discount, expiryDate, status } = req.body;
  const coupon = await Coupon.findByPk(req.params.id);
  if (code) coupon.code = code;
  if (discount) coupon.discount = discount;
  if (expiryDate) coupon.expiryDate = expiryDate;
  if (status) coupon.status = status;
  await coupon.save();
  res.status(200).json({ success: true, data: coupon });
});
export const deleteCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.findByPk(req.params.id);
  if (!coupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }
  await coupon.destroy();
  res
    .status(200)
    .json({ success: true, message: "Coupon deleted successfully" });
});

export const getCouponById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const coupon = await Coupon.findOne({
    where: {
      [Op.or]: [{ code: req.params.id }],
    },
  });
  if (!coupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }
  if (coupon.status == "inactive") {
    return res
      .status(400)
      .json({ success: false, message: "Coupon is inactive" });
  }
  res.status(200).json({ success: true, data: coupon });
});
