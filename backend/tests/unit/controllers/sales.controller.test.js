const chai = require('chai');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const { assert, expect } = chai;

const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

describe('Teste de Sales na Camada Controller', function () {
  afterEach(function () {
    sinon.restore(); // Restaurar os stubs após cada teste
  });

  it('Deve chamar salesController.getSales e retorna status 200', async function () {
    // Arranjo
    const getSalesServiceStub = sinon.stub(salesService, 'getSales').resolves([]);

    // Simula a requisição e a resposta
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(), // Para encadear métodos
      json: sinon.stub(),
    };

    // Ação
    await salesController.getSales(req, res);

    // Assert
    assert.isTrue(getSalesServiceStub.calledOnce);
    expect(res.status).to.have.been.calledWith(200);
  });

  // NOT ME
  it('Deve retornar status 404 quando a venda não existe para getSaleById', async function () {
    // Arranjo
    sinon.stub(salesService, 'getSaleById').resolves([]);

    // Simula a requisição e a resposta
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await salesController.getSaleById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});
