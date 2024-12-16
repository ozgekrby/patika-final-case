const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json({ message: "Ürün başarıyla eklendi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Ürün başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
