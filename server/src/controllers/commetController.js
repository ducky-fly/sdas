const commentModel = require("../models/commetModel");
const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");
const mongoose = require("mongoose");
const productModel = require("../models/songModel");

const createComment = asyncHandler(async (req, res) => {
  try {
    const { productId, content } = req.body;

    const newComment = new commentModel({
      productId,
      userId: req.user.id,
      content,
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể tạo bình luận." });
  }
});

const getCommentsByProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await commentModel
      .find({ productId: new mongoose.Types.ObjectId(id) })
      .populate("userId", "username") // chỉ lấy trường username
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể lấy bình luận." });
  }
});

// Tăng views
const incrementView = asyncHandler(async (req, res) => {
  try {
    const { id: songId } = req.params;

    const song = await Song.findByIdAndUpdate(
      songId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!song) return res.status(404).json({ error: "Bài hát không tồn tại." });

    res.status(200).json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể tăng lượt xem." });
  }
});

// Like hoặc unlike bài hát
// Like hoặc unlike bài hát

const rateSong = asyncHandler(async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user.id;
    const { star } = req.body;
    console.log("hello");

    console.log({ productId, userId, star });

    if (!star || star < 1 || star > 5)
      return res.status(400).json({ error: "Số sao phải từ 1 đến 5" });

    const product = await productModel.findById(productId);
    if (!product)
      return res.status(404).json({ error: "Sản phẩm không tồn tại." });

    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].star = star;
    } else {
      product.ratings.push({ userId, star });
    }

    await product.save();

    const totalStars = product.ratings.reduce((acc, r) => acc + r.star, 0);
    const avgStar = totalStars / product.ratings.length;

    return res.status(200).json({
      message: "Đánh giá thành công",
      averageStar: avgStar.toFixed(1),
      totalRatings: product.ratings.length,
      ratings: product.ratings,
    });
  } catch (error) {
    console.log(error);
  }
});
const getSongStats = asyncHandler(async (req, res) => {
  try {
    const { id: songId } = req.params;

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Bài hát không tồn tại." });

    let liked = false;

    // Kiểm tra nếu người dùng đã đăng nhập
    if (req.user && req.user.id) {
      const userIdStr = req.user.id.toString();
      liked = song.likes.some((id) => id.toString() === userIdStr); // ✅ so sánh ObjectId với string
    }

    res.status(200).json({
      totalViews: song.views || 0,
      totalLikes: song.likes.length,
      liked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể lấy thống kê bài hát." });
  }
});

module.exports = {
  createComment,
  getCommentsByProduct,
  rateSong,
  getSongStats,
  incrementView,
};
