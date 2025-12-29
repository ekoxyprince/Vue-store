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
  const coupons = await Coupon.findAll();
  res.status(200).json({ success: true, data: coupons });
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
  const coupon = await Coupon.findOne({
    where: {
      [Op.or]: [{ id: req.params.id }, { code: req.params.id }],
    },
  });
  if (!coupon) {
    return res
      .status(404)
      .json({ success: false, message: "Coupon not found" });
  }
  res.status(200).json({ success: true, data: coupon });
});
