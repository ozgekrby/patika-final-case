import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as UserService from "../../services/user.service.js";

import { refreshAuthToken } from "../../utils/jwt-token.js";
import { NotFoundError } from "ok-backend-common/errors/app.error.js";

const profile = catchAsyncError(async (req, res, next) => {
  const user = await UserService.findByEmail(req.user.email);

  if (!user) {
    return next(new NotFoundError("User not found!"));
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
});

const update = catchAsyncError(async (req, res, next) => {
  const user = await UserService.findByEmail(req.user.email);

  try {
    const updatedUser = await UserService.update(user, req.body);
    const token = await refreshAuthToken(updatedUser, req.token);
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
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
});

export { profile, update };
