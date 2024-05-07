const productsService = require('../services/products.service');

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

// Iniciando Req 3

const postProducts = async (req, res) => {
  // Extrair o nome do produto do corpo da requisição
  const { name } = req.body;

  // Verificar se o campo name está presente na requisição
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  
  // Verificar se o campo name tem pelo menos 5 caracteres
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  // Criar um novo produto no banco de dados
  const newProduct = await productsService.postProduct(name);

  // Retornar o objeto do produto criado com o status HTTP 201
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Verificar se o campo name está presente na requisição
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  
  // Verificar se o campo name tem pelo menos 5 caracteres
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  // Verificar se o produto existe
  const existingProduct = await productsService.getProductsId(id);
  if (existingProduct.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Atualizar o produto no banco de dados
  const updatedProduct = await productsService.updateProduct(id, name);

  // Retornar o objeto do produto atualizado com o status HTTP 200
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Verificar se o produto existe
  const existingProduct = await productsService.getProductsId(id);
  if (existingProduct.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Deletar o produto no banco de dados
  await productsService.deleteProduct(id);

  // Retornar o status HTTP 204 (sem conteúdo)
  res.sendStatus(204);
};

module.exports = {
  getProducts,
  getProductsId,
  postProducts,
  updateProduct,
  deleteProduct,
};
