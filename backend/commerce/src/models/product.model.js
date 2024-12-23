import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const calculateDiscount = (price, discountPercentage) => {
  const discountAmount = Math.round(price * (discountPercentage / 100));
  const discountedPrice = Math.round(price - discountAmount);
  return { discountAmount, discountedPrice };
};

ProductSchema.virtual("discountedPrice").get(function () {
  return calculateDiscount(this.price, this.discountPercentage).discountedPrice;
});

ProductSchema.virtual("discountAmount").get(function () {
  return calculateDiscount(this.price, this.discountPercentage).discountAmount;
});

ProductSchema.virtual("displayDiscountedPrice").get(function () {
  return this.discountedPrice / 100;
});

ProductSchema.virtual("displayDiscountAmount").get(function () {
  return this.discountAmount / 100;
});

ProductSchema.virtual("displayPrice").get(function () {
  return this.price / 100;
});

ProductSchema.pre("save", function (next) {
  this.price = Math.round(this.price * 100);
  next();
});

const Product = model("product", ProductSchema);

export default Product;
