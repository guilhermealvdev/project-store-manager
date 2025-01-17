const validacaoCreateSale = async (req, res, next) => {
  const newSale = req.body;
  if (newSale.some((item) => !item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (newSale.some((item) => item.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (newSale.some((item) => item.quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validacaoCreateSale,
};
