import Product from "../models/product.model.js";
import { elasticClient } from "ok-backend-common/utils/index.js";

const search = async (q, category = null, sort = "") => {
  q = q.toLowerCase();

  const query = {
    bool: {
      must: [
        {
          bool: {
            should: [
              { wildcard: { title: `*${q}*` } },
              { wildcard: { description: `*${q}*` } },
            ],
          },
        },
      ],
    },
  };

  if (category) {
    query.bool.filter = [
      {
        term: { category },
      },
    ];
  }

  const sortOption = sort ? [{ price: { order: sort } }] : [];

  try {
    const response = await elasticClient.search({
      index: "products",
      body: {
        query,
        sort: sortOption,
      },
    });

    if (!response) {
      throw new Error("Elasticsearch error");
    }

    const hits = response.hits;

    const productIds = hits.hits.map((hit) => hit._id);
    return Product.find({ _id: { $in: productIds } });
  } catch (error) {
    console.error("Elasticsearch error:", error);
  }
};

const findById = async (id) => {
  return Product.findById(id);
};

const findAll = async () => {
  return Product.find();
};

const findAllWithCategory = async () => {
  return Product.find().populate("category");
};

const findOneBySlug = async (slug) => {
  return Product.findOne({ slug: slug });
};

const create = async (data) => {
  try {
    const product = await Product.create(data);
    await elasticClient.index({
      index: "products",
      id: product._id.toString(),
      body: {
        ...product.toObject(),
        _id: undefined,
      },
    });
    return product;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(
        "Bu slug değeri zaten mevcut. Lütfen farklı bir slug değeri kullanın."
      );
    }
    throw error;
  }
};

const update = async (product, data) => {
  try {
    Object.assign(product, data);
    const updatedProduct = await product.save();
    await elasticClient.update({
      index: "products",
      id: updatedProduct._id.toString(),
      body: {
        doc: {
          ...updatedProduct.toObject(),
          _id: undefined,
        },
      },
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const remove = async (product) => {
  try {
    return await Product.deleteOne({ _id: product.id });
  } catch (error) {
    throw error;
  }
};

export {
  search,
  findById,
  findAll,
  findAllWithCategory,
  findOneBySlug,
  create,
  update,
  remove,
};
