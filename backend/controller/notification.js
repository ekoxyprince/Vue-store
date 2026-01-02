import catchAsync from "../utils/catchAsync.js";

export const sendEmailNotificationAdmin = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  res.status(200).json({ success: true, message: "Message sent" });
});
