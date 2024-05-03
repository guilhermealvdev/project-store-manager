const conn = require('../db/index');

const getSales = async () => {
  const [rows] = await conn.query(`
  SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
  FROM sales AS s
  JOIN sales_products AS sp ON s.id = sp.sale_id
  ORDER BY s.id
`);
  return rows;
};

module.exports = {
  getSales,
};
