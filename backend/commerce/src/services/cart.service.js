import * as OrderService from "../services/order.service.js";
import redisClient from "ok-backend-common/utils/redis-client.js";
import { generateOrderNumber } from "ok-backend-common/utils/string.js";

const CART_PREFIX = "cart:";

const getCartKey = (hash) => `${CART_PREFIX}${hash}`;

export const addItemToCart = async (user, product, quantity) => {
  const cartKey = getCartKey(user._id);
  const productKey = `product:${product.id}`;
  const existingItem = await redisClient.sendCommand([
    "HGET",
    cartKey,
    productKey,
  ]);

  const cartItem = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    thumbnail: product.thumbnail,
    stockQuantity: product.stockQuantity,
    discountPercentage: product.discountPercentage,
    discountAmount: product.discountAmount,
    quantity: Number(quantity),
  };

  if (existingItem) {
    const parsedItem = JSON.parse(existingItem);
    const newQuantity = parsedItem.quantity + Number(quantity);
    if (newQuantity > product.stockQuantity) {
      throw new Error("Insufficient stock quantity");
    }
    parsedItem.quantity = newQuantity;
    await redisClient.sendCommand([
      "HSET",
      cartKey,
      productKey,
      JSON.stringify(parsedItem),
    ]);
  } else {
    if (Number(quantity) > product.stockQuantity) {
      throw new Error("Insufficient stock quantity");
    }
    await redisClient.sendCommand([
      "HSET",
      cartKey,
      productKey,
      JSON.stringify(cartItem),
    ]);
  }

  return await getCart(user);
};

export const removeItemFromCart = async (user, product) => {
  const cartKey = getCartKey(user._id);
  const productKey = `product:${product._id}`;
  await redisClient.sendCommand(["HDEL", cartKey, productKey]);
};

export const getCart = async (user) => {
  const cartKey = getCartKey(user._id);
  const cartItems = await redisClient.sendCommand(["HGETALL", cartKey]);
  const items = {};
  for (let i = 0; i < cartItems.length; i += 2) {
    items[cartItems[i]] = JSON.parse(cartItems[i + 1]);
  }
  return Object.values(items);
};

export const clearCart = async (user) => {
  const cartKey = getCartKey(user._id);
  await redisClient.sendCommand(["DEL", cartKey]);
};

export const toOrder = async (user, billingAddress) => {
  const cartItems = await getCart(user);

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart not found or empty");
  }

  const orderItems = cartItems.map((item) => ({
    product: item.id,
    quantity: item.quantity,
    price: item.price,
    productDiscount: item.discountAmount,
  }));

  const order = {
    number: generateOrderNumber(),
    user: user,
    items: orderItems,
    total: cartItems.reduce(
      (total, item) =>
        total + (item.price * item.quantity - item.discountAmount),
      0
    ),
    billingAddress: billingAddress,
  };

  const createdOrder = await OrderService.create(order);

  if (!createdOrder) {
    throw new Error("Order not created");
  }

  return createdOrder;
};
