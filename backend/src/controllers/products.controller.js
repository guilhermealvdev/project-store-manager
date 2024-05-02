const productsService = require('../services/products.service');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  return res.status(200).json(products);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductsId(id);
  if (product === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]); // Caso exista volta a primeira posição
};

module.exports = {
  getProducts,
  getProductsId,
};
