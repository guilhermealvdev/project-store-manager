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

module.exports = {
  getProductsId,
  getProducts,
  postProduct,
};
