import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as UserService from "../../services/user.service.js";

const index = catchAsyncError(async (req, res, next) => {
  const users = await UserService.findAll();

  res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
});

const detail = catchAsyncError(async (req, res, next) => {
  const user = req.foundUser;

  res.status(200).json({
    success: true,
    data: {
      user: user,
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  const user = req.foundUser;

  try {
    const updatedUser = await UserService.update(user, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          roles: updatedUser.roles,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export { index, detail, update };
