import User from "../models/user.model.js";

const findById = async (id) => {
  return User.findById(id);
};

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findAll = async () => {
  return User.find().select("-password");
};

const create = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (user, data) => {
  try {
    Object.assign(user, data);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

export { findById, findByEmail, findAll, create, update };
