const salesModel = require('../models/sales.model');

const getSales = () => {
  const sales = salesModel.getSales();
  return sales;
};

module.exports = {
  getSales,
};
