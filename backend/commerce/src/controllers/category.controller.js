import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as CategoryService from "../services/category.service.js";

const getBySlug = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  console.log(slug);

  const category = await CategoryService.findOneBySlug(slug);

  res.status(200).json({
    success: true,
    data: {
      category,
    },
  });
});

export { getBySlug };
