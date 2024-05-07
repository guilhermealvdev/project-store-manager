const express = require('express');

const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const { validacaoCreateSale } = require('./middlewares/validacaoCreateSale');

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
// app.post('/sales', salesController.createSale);
app.post('/sales', validacaoCreateSale, salesController.createSale);

// Req 7
app.put('/products/:id', productsController.updateProduct);

// Req 8
app.delete('/products/:id', productsController.deleteProduct);

module.exports = app;
