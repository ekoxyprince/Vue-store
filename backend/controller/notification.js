import catchAsync from "../utils/catchAsync.js";
import { mail } from "../utils/mailer.js";

export const sendEmailNotificationAdmin = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  mail("default", name, email, subject, message);
  res.status(200).json({ success: true, message: "Message sent" });
});
export const sendEmailNotification = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  mail(
    "default",
    undefined,
    undefined,
    subject,
    `
New message from a user.

Sender Details:
Name: ${name}
Email: ${email}

Message:
${message}
    `
  );
  res.status(200).json({ success: true, message: "Message sent" });
});
