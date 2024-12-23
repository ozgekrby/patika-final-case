import { errorHandler } from "ok-backend-common/middlewares/error.handler.js";
import {
  authenticateToken,
  authorizeRoles,
} from "ok-backend-common/middlewares/auth.middleware.js";
import ROLES from "ok-backend-common/constants/roles.js";

import AuthRouter from "./routes/auth.routes.js";
import UserAccountRouter from "./routes/account.routes.js";
import CartRouter from "./routes/cart.routes.js";
import OrderRouter from "./routes/order.routes.js";

import CategoryRouter from "./routes/category.routes.js";
import ProductRouter from "./routes/product.routes.js";

import AdminAccountRouter from "./routes/admin/account.routes.js";
import AdminUserRouter from "./routes/admin/user.routes.js";
import AdminCategoryRouter from "./routes/admin/category.routes.js";
import AdminProductRouter from "./routes/admin/product.routes.js";
import AdminOrderRouter from "./routes/admin/order.routes.js";

export function bootstrap(app) {
  app.use("/api/auth", AuthRouter);

  app.use("/api/categories", CategoryRouter);
  app.use("/api/products", ProductRouter);

  /* USER ROUTES */
  app.use(
    "/api/account",
    authenticateToken,
    authorizeRoles(ROLES.USER),
    UserAccountRouter
  );
  app.use(
    "/api/cart",
    authenticateToken,
    authorizeRoles(ROLES.USER),
    CartRouter
  );
  app.use(
    "/api/orders",
    authenticateToken,
    authorizeRoles(ROLES.USER),
    OrderRouter
  );

  /* ADMIN ROUTES */
  app.use("/api/admin", authenticateToken, authorizeRoles(ROLES.ADMIN));
  app.use("/api/admin/account", AdminAccountRouter);
  app.use("/api/admin/users", AdminUserRouter);
  app.use("/api/admin/categories", AdminCategoryRouter);
  app.use("/api/admin/products", AdminProductRouter);
  app.use("/api/admin/orders", AdminOrderRouter);

  app.use(errorHandler);
}
