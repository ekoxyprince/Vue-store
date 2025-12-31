import Review from "../models/review.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";

export const createReview = catchAsync(async (req, res) => {
  const { rating, review, productId } = req.body;

  const product = await Product.findByPk(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  console.log(req.body);
  await product.createReview({
    rating,
    review,
    userId: req.user.id,
  });
  res.status(200).json({ success: true });
});

export const getAllReviews = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const totalReviews = await Review.count();
  const reviews = await Review.findAll({
    limit,
    offset,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["fullname"],
      },
      {
        model: Product,
        as: Product,
        attributes: ["name"],
      },
    ],
  });
  res.status(200).json({
    success: true,
    data: reviews,
    meta: {
      totalReviews,
      page,
      limit,
    },
  });
});

export const updateReview = catchAsync(async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }
  await review.update({
    status: req.body.status,
    review: req.body.review,
    rating: req.body.rating,
  });
  res.status(200).json({ success: true, message: "review updated" });
});

export const deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }
  await review.destroy();
  res.status(200).json({ success: true, message: "review deleted" });
});
