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

const getSaleById = async (id) => {
  const [rows] = await conn.query(`
    SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id ASC, sp.product_id ASC
  `, [id]);
  console.log('Alv');
  console.log('Aqui está retornando tudo, posso remover saleId na camada service');
  return rows;
};

module.exports = {
  getSales,
  getSaleById,
};
