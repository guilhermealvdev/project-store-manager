const productsModel = require('../models/products.model');

const getProducts = () => {
  const product = productsModel.getProducts();
  return product;
};

const getProductsId = (id) => {
  const product = productsModel.getProductsId(id);
  if (product.length === 0) { // If pra voltar 404 se nao existir
    return null;
  }
  return product;
};

module.exports = {
  getProductsId,
  getProducts,
};
