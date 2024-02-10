// Custom Imports
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Post = require("../models/postModel");
const checkRequiredFields = require("../utils/requiredFieldError");

exports.createPost = catchAsync(async (req, res, next) => {
  const { name, prompt, photo } = req.body;

  // 1) Check required fields
  const requiredFields = ["name", "prompt", "photo"];
  const missingFields = checkRequiredFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  // 2) Image upload to Cloudinary
  const result = await cloudinary.uploader.upload(photo, {
    folder: "dalle",
    public_id: `${name}-${prompt}-${Date.now()}`,
  });

  // 3) Create new post
  const newPost = await Post.create({
    name,
    prompt,
    photo: result.secure_url,
  });

  res.status(201).json({
    status: "success",
    data: newPost,
  });
});
