const productsService = require('../services/products.service');
// const modeltext = require('../models/products.model');

const getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  return res.status(200).json(products);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductsId(id);
  console.log(product);
  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]); // Caso exista volta a primeira posição
};

// const getProducts = async (req, res) => res.status(200).json({ message: 'Teste' });

// Iniciando Req 3

const postProducts = async (req, res) => {
  // Extrair o nome do produto do corpo da requisição
  const { name } = req.body;

  // Criar um novo produto no banco de dados
  const newProduct = await productsService.postProduct(name);

  // Retornar o objeto do produto criado com o status HTTP 201
  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  getProductsId,
  postProducts,
};
