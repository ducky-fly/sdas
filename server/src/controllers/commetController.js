const commentModel = require("../models/commetModel");
const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");
const mongoose = require("mongoose");

const createComment = asyncHandler(async (req, res) => {
  try {
    const { songId, content } = req.body;

    const newComment = new commentModel({
      songId,
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
const getCommentsBySong = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await commentModel
      .find({ songId: new mongoose.Types.ObjectId(id) }) // ✅ Đúng cú pháp
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    console.log(comments);

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
const toggleLike = asyncHandler(async (req, res) => {
  try {
    const { id: songId } = req.params;
    const userId = req.user.id;

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Bài hát không tồn tại." });

    const alreadyLiked = song.likes.includes(userId);

    // Dùng findByIdAndUpdate để tránh lỗi version
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      alreadyLiked
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } }, // dùng $addToSet để tránh duplicate
      { new: true } // Trả về document sau khi update
    );

    return res.status(200).json({
      likes: updatedSong.likes,
      liked: !alreadyLiked,
      totalLikes: updatedSong.likes.length,
    });
  } catch (err) {
    console.error("toggleLike error:", err);
    return res.status(500).json({ error: "Không thể xử lý like/unlike." });
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
  getCommentsBySong,
  toggleLike,
  getSongStats,
  incrementView,
};
