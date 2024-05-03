const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const conexao = require('../../../src/db/index');

describe('Teste de Sales na Camada Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste function getSales', async function () {
    // Arranjo
    const sales = [
      {
        saleId: 1,
        date: '2024-05-03T17:34:35.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2024-05-03T17:34:35.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2024-05-03T17:34:35.000Z',
        productId: 3,
        quantity: 15,
      },
    ];

    sinon.stub(conexao, 'query').resolves([sales]);

    // Ação
    const result = await salesModel.getSales();

    // Assert / Expect
    expect(result).to.be.an('array');
  });

  it('Teste function  getSalesById com id 2', async function () {
    // Arranjo
    const saleId = 2;
    const expectedProduct = {
      saleId: 2,
      date: '2024-05-03T17:34:35.000Z',
      productId: 3,
      quantity: 15,
    };
    
    sinon.stub(conexao, 'query').resolves([expectedProduct]); // mais um []?

    // Ação
    const result = await salesModel.getSaleById(saleId);

    // Assert / Expect
    expect(result).to.be.an('object');
  });
});