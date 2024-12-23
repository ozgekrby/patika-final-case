import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as ProductService from "../services/product.service.js";

const search = catchAsyncError(async (req, res, next) => {
  const q = req.query.q || "";
  const category = req.query.category || null;
  const sort = req.query.sort || "";

  const products = await ProductService.search(q, category, sort);
  res.status(200).json({
    success: true,
    data: {
      products,
    },
  });
});

const getBySlug = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  const product = await ProductService.findOneBySlug(slug);

  res.status(200).json({
    success: true,
    data: {
      product,
    },
  });
});

export { search, getBySlug };
