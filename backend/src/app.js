const express = require('express');

const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsId);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSaleById);

app.post('/products', productsController.postProducts);
app.post('/sales', salesController.createSale);

module.exports = app;
