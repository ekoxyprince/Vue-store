import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: [
        "password",
        "resetPasswordToken",
        "resetPasswordExpires",
        "createdAt",
        "updatedAt",
      ],
    },
  });
  res.status(200).json({ success: true, data: user });
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const { fullname, address, phone } = req.body;
  const user = await User.findByPk(req.user.id, { include: ["orders"] });
  if (fullname) user.fullname = fullname;
  if (address) user.address = address;
  if (phone) user.phone = phone;
  await user.save();
  res.status(200).json({ success: true, data: user });
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Current password is incorrect" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const totalUsers = await User.count({ where: { role: "user" } });
  const users = await User.findAll({
    attributes: {
      exclude: [
        "password",
        "resetPasswordToken",
        "resetPasswordExpires",
        "createdAt",
        "updatedAt",
      ],
    },
    limit: limit,
    offset: offset,
    where: { role: "user" },
  });
  res.status(200).json({
    success: true,
    data: users,
    meta: {
      page,
      totalUsers,
      limit,
    },
  });
});
