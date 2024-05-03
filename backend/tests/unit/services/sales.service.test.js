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
});
