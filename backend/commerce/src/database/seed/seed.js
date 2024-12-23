import { connectMongoDB } from "ok-backend-common/mongodb/connection.js";
import { seedCategory } from "./category.js";
import { seedProduct } from "./product.js";
import { seedUser } from "./user.js";
import { seedCart } from "./cart.js";
import { seedOrder } from "./order.js";

const seedData = async () => {
  try {
    await connectMongoDB();
    console.log("Seed [started] please wait..");
    await seedCategory();
    await seedProduct();
    await seedUser();
    await seedCart();
    await seedOrder();

    console.log("Seed completed..");
  } catch (error) {
    console.log(error);
  }
};

seedData();
