import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV as env } from "../config/env.js";
import catchAsync from "../utils/catchAsync.js";
import crypto from "crypto";
import { Op } from "sequelize";
import { mail } from "../utils/mailer.js";

export const register = catchAsync(async (req, res) => {
  const { fullname, email, password, phone, address } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  mail(
    undefined,
    fullname,
    email,
    "Welcome to AER — Your Journey Begins 🚀",
    `Welcome to AER (Arusiegi Republic)!

We’re excited to have you join our community. Your account has been successfully created, and you now have access to everything AER has to offer — from exclusive content to future updates and events.

If you ever need help or have questions, our support team is always here for you.

Welcome aboard, and enjoy the experience.`
  );
  mail(
    undefined,
    undefined,
    undefined,
    "New User Registration — AER",
    `A new user has successfully registered on AER (Arusiegi Republic).

User Details:
• Full Name: ${fullname}
• Email: ${email}

You can review or manage this account from the admin dashboard.

This is an automated notification.`
  );

  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
    address,
    phone,
  });

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret);

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
      token,
      orders: await user.getOrders(),
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret);
  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      address: user.address,
      phone: user.phone,
      token,
      orders: await user.getOrders(),
    },
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpires = Date.now() + 3600000;
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  await user.update({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires,
  });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;
  await mail(
    "default",
    user.fullname,
    user.email,
    "Reset Your Password — AER",
    `You requested a password reset.

Click the link below to reset your password:
${resetUrl}

If you did not request this, please ignore this email.
This link will expire in 1 hour.`
  );

  res.status(200).json({
    success: true,
    message: "Password reset token generated",
  });
});

export const resetPasswordAction = catchAsync(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    where: {
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await user.update({
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
