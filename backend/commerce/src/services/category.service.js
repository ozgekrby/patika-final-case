import Category from "../models/category.model.js";

const findById = async (id) => {
  return Category.findById(id);
};

const findAll = async () => {
  return Category.find().select("-password");
};

const findOneBySlug = async (slug) => {
  return Category.findOne({ slug: slug });
};

const create = async (data) => {
  try {
    return await Category.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (category, data) => {
  try {
    Object.assign(category, data);
    return await category.save();
  } catch (error) {
    throw error;
  }
};

const remove = async (category) => {
  try {
    return await Category.deleteOne({ _id: category.id });
  } catch (error) {
    throw error;
  }
};

export { findById, findAll, findOneBySlug, create, update, remove };
