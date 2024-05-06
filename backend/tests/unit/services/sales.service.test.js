const sinon = require('sinon');
const { assert } = require('chai');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

describe('Teste de Sales na Camada Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste se getSales do service chama getSales do model', async function () {
    // Arranjo
    const getSalesModelStub = sinon.stub(salesModel, 'getSales').resolves([]);

    // Ação
    await salesService.getSales();

    // Assert / Expect
    assert.isTrue(getSalesModelStub.calledOnce);
  });

  it('Teste se getSaleById do service chama getSalesId do model', async function () {
    // Arranjo
    const saleId = 1;
    const getSalesModelStub = sinon.stub(salesModel, 'getSaleById').resolves([]);

    // Ação
    await salesService.getSaleById(saleId);

    // Assert
    assert.isTrue(getSalesModelStub.calledOnceWith(saleId));
    // Igual no teste anterior, nao funcionou com 'expect', usei assert novamente.
  });
});
