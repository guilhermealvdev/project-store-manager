const chai = require('chai');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const { assert, expect } = chai;

const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

describe('Teste de Products na Camada Controller', function () {
  afterEach(function () {
    sinon.restore(); // Restaurar os stubs após cada teste
  });

  it('Deve chamar productsController.getProducts e retorna status 200', async function () {
    // Arranjo
    const getProductsServiceStub = sinon.stub(productsService, 'getProducts').resolves([]);

    // Simula a requisição e a resposta
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // Para encadear métodos
      json: sinon.stub(),
    };

    // Ação
    await productsController.getProducts(req, res);

    // Assert
    assert.isTrue(getProductsServiceStub.calledOnce);
    expect(res.status).to.have.been.calledWith(200);
  });
});
