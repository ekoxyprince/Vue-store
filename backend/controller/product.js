import Product from "../models/product.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/review.js";
import Image from "../models/image.js";
import Sequelize, { Op } from "sequelize";

export const getAllProducts = catchAsync(async (req, res) => {
  const where = {};
  if (req.query.category) {
    where.category = req.query.category;
  }
  if (req.query.brand) {
    where.brand = req.query.brand;
  }
  if (req.query.minPrice && req.query.maxPrice) {
    where.finalPrice = {
      [Op.gte]: req.query.minPrice,
      [Op.lte]: req.query.maxPrice,
    };
  }
  if (req.query.search) {
    where.name = { [Op.iLike]: `%${req.query.search}%` };
  }
  if (req.query.availabilty) {
    where.stockCount =
      req.query.availabilty === "in-stock" ? { [Op.gt]: 0 } : { [Op.lte]: 0 };
  }
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const totalProducts = await Product.count({ where });
  console.log(where, "where");
  console.log(req.query, "Query");
  const products = await Product.findAll({
    subKey: false,
    attributes: {
      include: [
        [
          Sequelize.literal(`(
          SELECT COALESCE(AVG(r.rating), 0)
          FROM reviews AS r
          WHERE r.productId = product.id
        )`),
          "averageRating",
        ],
      ],
    },
    include: [
      {
        model: Image,
        as: "images",
      },
      {
        model: Review,
        as: "reviews",
        attributes: [],
      },
    ],
    where,
    limit,
    offset,
  });
  res.status(200).json({
    success: true,
    data: products,
    meta: {
      totalProducts,
      page,
      limit,
    },
  });
});
export const getProductById = catchAsync(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    attributes: {
      include: [
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
            0
          ),
          "averageRating",
        ],
      ],
    },
    include: [
      {
        model: Image,
        as: "images",
      },
      {
        model: Review,
        as: "reviews",
        attributes: [],
      },
    ],
    group: ["Product.id", "images.id"],
  });
  res.status(200).json({
    success: true,
    data: product,
  });
});
export const createProduct = catchAsync(async (req, res) => {
  const {
    name,
    price,
    discount,
    description,
    details,
    stockCount,
    category,
    brand,
  } = req.body;
  const finalPrice = price - price * (discount / 100);
  const product = await Product.create({
    name,
    price,
    finalPrice,
    discount,
    description,
    details,
    stockCount,
    category,
    brand,
  });
  const files = req.files;
  if (files && files.length > 0) {
    const imagePromises = files.map((file) => {
      const image = `${file.destination + file.filename}`.slice(16);
      return product.createImage({
        url: `${req.protocol}://${req.host}${image}`,
      });
    });
    await Promise.all(imagePromises);
  }
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  const {
    name,
    price,
    discount,
    description,
    details,
    stockCount,
    category,
    brand,
  } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  if (discount) product.discount = discount;
  if (description) product.description = description;
  if (details) product.details = details;
  if (stockCount) product.stockCount = stockCount;
  if (category) product.category = category;
  if (brand) product.brand = brand;
  if (price && discount) product.finalPrice = price - price * (discount / 100);
  await product.save();
  res.status(200).json({ success: true, data: product });
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  await product.destroy();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});
