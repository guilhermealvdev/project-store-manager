const { assert } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');

describe('Teste de Products na Camada Controller', function () {
  afterEach(function () {
    sinon.restore(); // Restaurar os stubs após cada teste
  });

  it('Deve chamar productsService.getProducts', async function () {
    // Arranjo
    const getProductsServiceStub = sinon.stub(productsService, 'getProducts').resolves([]);

    // Simula a requisição e a resposta
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // Para encadear métodos
      json: sinon.stub(),
    };

    // Ação
    await productsService.getProducts(req, res);

    // Assert
    assert.isTrue(getProductsServiceStub.calledOnce);
  });
});
