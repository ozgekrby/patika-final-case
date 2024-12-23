import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as CategoryService from "../../services/category.service.js";
import slugify from "slugify";

const index = catchAsyncError(async (req, res, next) => {
  const categories = await CategoryService.findAll();
  res.status(200).json({
    success: true,
    data: {
      categories,
    },
  });
});

const detail = catchAsyncError(async (req, res, next) => {
  const category = req.foundCategory;
  res.status(200).json({
    success: true,
    data: {
      category,
    },
  });
});

const create = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  if (!data.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  const category = await CategoryService.create(data);

  res.status(201).json({
    success: true,
    data: {
      category,
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  const category = req.foundCategory;
  const data = req.body;
  const updatedCategory = await CategoryService.update(category, data);
  res.status(200).json({
    success: true,
    data: {
      category: updatedCategory,
    },
  });
});

const remove = catchAsyncError(async (req, res, next) => {
  const category = req.foundCategory;
  await CategoryService.remove(category);
  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export { index, detail, create, update, remove };
