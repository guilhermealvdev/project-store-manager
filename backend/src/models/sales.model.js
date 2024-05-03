const conn = require('../db/index');

// Preciso pegar a 'date' que se encontra no db 'sales' ?

const getSales = async () => {
  const [rows] = await conn.query('SELECT * FROM sales_products');
  return rows;
};

module.exports = {
  getSales,
};
