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

const updateProduct = async (productId, name) => {
  const id = Number(productId);
  await conn.query('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id, name };
};

module.exports = {
  getProductsId,
  getProducts,
  postProduct,
  updateProduct,
};

// ORDER BY id ASC (não precisou)
