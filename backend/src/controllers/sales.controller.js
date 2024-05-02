const conn = require('../db/index');

const getSales = async (req, res) => {
  const [rows] = await conn.query('SELECT * FROM sales_products'); // Preciso pegar a 'date' que se encontra no db 'sales'
  res.status(200).json(rows);
};

module.exports = {
  getSales,
};