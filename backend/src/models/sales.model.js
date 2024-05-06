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

// const createSale = async (saleData) => {
//   console.log('Valor de saleData chegando no Model:');
//   console.log(saleData);
// };

const createSale = async (newSale) => {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  // Populei a tabela 'sales' aqui
  const [result] = await conn.query('INSERT INTO sales (date) VALUES (?)', [date]);
  console.log(result); // Agr pego o .insertId daqui?
  console.log('alv alv alv alv alv alv alv');
  console.log(result.insertId);
  const saleId = result.insertId;

  newSale.map(async (item) => {
    const [productsResult] = await conn.query(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, item.productId, item.quantity],
    );
    console.log('# alv #');
    console.log('valor de productResults:', productsResult); // irrelevante
  });

  return { id: saleId, itemsSold: newSale };
  /*
  Tenho disponivel um array que posso usar depois.
  1- Vou criar uma sale, com a data de hoje.
  2- Vai ser gerado um id
  3- Pegar o array e popular a tabela sales_product com as infos (sale_id (id gerado anteriormente), product_id e quantity)
  */
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
};
