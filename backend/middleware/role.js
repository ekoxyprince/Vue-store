export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};
export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};
