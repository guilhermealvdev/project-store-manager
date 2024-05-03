const salesService = require('../services/sales.service');

const getSales = async (req, res) => {
  const sales = await salesService.getSales();
  return res.status(200).json({ sales });
};

module.exports = {
  getSales,
};