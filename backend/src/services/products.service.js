const productsModel = require('../models/products.model');

const getProducts = () => {
  const product = productsModel.getProducts();
  return product;
};

const getProductsId = (id) => {
  const product = productsModel.getProductsId(id);
  return product;
};

const postProduct = async (name) => {
  const product = await productsModel.postProduct(name);
  return product;
};

const updateProduct = async (id, name) => {
  const updatedProduct = await productsModel.updateProduct(id, name);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
};

module.exports = {
  getProductsId,
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
