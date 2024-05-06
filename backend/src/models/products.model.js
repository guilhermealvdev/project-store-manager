const conn = require('../db/index');

const getProducts = async () => {
  const [rows] = await conn.query('SELECT * FROM products');
  return rows;
};

const getProductsId = async (id) => {
  const [rows] = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows;
};

async function postProduct(name) {
  const [result] = await conn.query('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: result.insertId, name }; // Retorna o ID gerado e o nome do produto
}

module.exports = {
  getProductsId,
  getProducts,
  postProduct,
};

// ORDER BY id ASC (não precisou)
