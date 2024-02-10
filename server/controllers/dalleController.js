// Custom Imports
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

exports.getDalle = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hello from DALL-E!",
  });
});

exports.createImageDalle = catchAsync(async (req, res, next) => {
  const { prompt } = req.body;

  // 1) Check required fields
  if (!prompt) {
    return next(new AppError("Missing prompt", 400));
  }

  // 2) Generate image from prompt
  const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  console.log("result", result);

  const image = result.data.data[0].b64_json;

  res.status(201).json({
    status: "success",
    data: image,
  });
});
