const salesModel = require('../models/sales.model');

const getSales = () => {
  const sales = salesModel.getSales();
  return sales;
};

// adicionei async/await aqui, talvez seja bom fazer em todas
// Porque? Apareceu 'Promise { <pending> }' no console ao ver sem async/await
const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  console.log('Alv 2');
  console.log(sale);
  console.log('Alv 3');
  return sale;
};

module.exports = {
  getSales,
  getSaleById,
};
