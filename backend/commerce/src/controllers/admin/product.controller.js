import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as ProductService from "../../services/product.service.js";
import slugify from "slugify";

const index = catchAsyncError(async (req, res, next) => {
  const products = await ProductService.findAllWithCategory();
  res.status(200).json({
    success: true,
    data: {
      products,
    },
  });
});

const detail = catchAsyncError(async (req, res, next) => {
  const product = req.foundProduct;
  res.status(200).json({
    success: true,
    data: {
      product,
    },
  });
});

const create = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  if (!data.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  const product = await ProductService.create(data);
  res.status(201).json({
    success: true,
    data: {
      product,
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  const product = req.foundProduct;
  const data = req.body;
  const updatedProduct = await ProductService.update(product, data);
  res.status(200).json({
    success: true,
    data: {
      product: updatedProduct,
    },
  });
});

const remove = catchAsyncError(async (req, res, next) => {
  await ProductService.remove(product);
  res.status(204).json({
    success: true,
    data: null,
  });
});

export { index, detail, create, update, remove };
