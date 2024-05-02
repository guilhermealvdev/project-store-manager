const salesService = require('../services/sales.service');

// Ainda não ta retornando o esperado
const getSales = async (req, res) => {
  const sales = await salesService.getSales();
  return res.status(200).json(sales);
};

module.exports = {
  getSales,
};