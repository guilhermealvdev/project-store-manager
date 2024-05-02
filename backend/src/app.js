const express = require('express');

const productsController = require('./controllers/products.controller');
const productsSales = require('./controllers/sales.controller');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);

app.get('/products/:id', productsController.getProductsId);

app.get('/sales', productsSales.getSales);

module.exports = app;

// Iniciando Projeto
