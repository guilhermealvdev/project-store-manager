const conn = require('../db/index');

const getProducts = async () => {
  const [rows] = await conn.query('SELECT * FROM products');
  return rows;
};

const getProductsId = async (id) => {
  const [rows] = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows;
};

module.exports = {
  getProductsId,
  getProducts,
};

// ORDER BY id ASC
