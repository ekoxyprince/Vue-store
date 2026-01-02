import app from "./app.js";
import http from "node:http";
import { connectDb, database } from "./config/db.js";
import Product from "./models/product.js";
import Image from "./models/image.js";
import User from "./models/user.js";
import Coupon from "./models/coupon.js";
import Review from "./models/review.js";
import Order from "./models/order.js";
import OrderItem from "./models/orderItem.js";

Image.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Product.hasMany(Image, { foreignKey: "productId" });
Review.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
Product.hasMany(Review, { foreignKey: "productId" });
Review.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Review, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsToMany(Product, { through: OrderItem });
const server = http.createServer(app);

connectDb()
  .then((resp) => {
    return database.sync();
  })
  .then((synced) => {
    server.listen(8000, () => {
      console.log("running on port 8000");
    });
  });
