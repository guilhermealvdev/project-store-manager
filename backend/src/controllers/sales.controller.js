const salesService = require('../services/sales.service');

const getSales = async (req, res) => {
  const sales = await salesService.getSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  console.log(sale);
  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  const saleWithoutSaleId = sale.map((obj) => {
    const { saleId, ...rest } = obj; // Desestruturação para remover 'saleId'
    return rest; // Retorna o objeto sem 'saleId'
  });

  console.log(saleWithoutSaleId);
  return res.status(200).json(saleWithoutSaleId); // Troquei 'sale' por 'saleWithoutSaleId' para nao ter o saleId no objeto
};

const createSale = async (req, res) => {
  const newSale = req.body;
  /*
    Validação (Parte da validação está em um middleware e outra parte abaixo.
    Isso porque estava dando erro de lint de complexidade maior que 5
  */
  if (newSale.length === 1 && !newSale.productId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (newSale.length >= 1 && !newSale.productId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  console.log('Alv, vendo valor de newSale (controller):');
  console.log(newSale);
  const saleRegistered = await salesService.createSale(newSale);
  res.status(201).json(saleRegistered);
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
};