const conn = require('../db/index');

const updateProducts = async (req, res) => {
  const [rows, fields] = await conn.query('SELECT * FROM products');
  res.json({
    rows,
    fields,
  });
  // res.status(200).json({ message: 'Alv' });
};

const updateProductsId = async (req, res) => {
  res.status(200).json({ message: 'Alv Id' });
};

module.exports = {
  updateProducts,
  updateProductsId,
};
