const chai = require('chai');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const { assert, expect } = chai;

const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { validacaoCreateSale } = require('../../../src/middlewares/validacaoCreateSale');

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

  it('Deve retornar status 400 se o campo "productId" estiver ausente em algum item', async function () {
    // Arranjo
    const req = { body: [{ quantity: 2 }] }; // Simula uma requisição com o campo "productId" ausente
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await validacaoCreateSale(req, res, () => {});

    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Deve retornar status 400 se o campo "quantity" estiver ausente em algum item', async function () {
    // Arranjo
    const req = { body: [{ productId: 1 }] }; // Simula uma requisição com o campo "quantity" ausente
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await validacaoCreateSale(req, res, () => {});

    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Deve retornar status 422 se a quantidade for menor ou igual a zero', async function () {
    // Arranjo
    const req = { body: [{ productId: 1, quantity: 0 }] }; // Simula uma requisição com quantidade menor ou igual a zero
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await validacaoCreateSale(req, res, () => {});

    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  // //////////////////////////////////////////////////////////////////////

  it('Deve criar uma nova venda com sucesso', async function () {
    // Arranjo
    const newSale = { items: [{ productId: 1, quantity: 2 }] }; // Simula uma requisição com dados válidos
    const saleRegisteredMock = { id: 1, ...newSale }; // Mock do retorno da venda registrada
    sinon.stub(salesService, 'createSale').resolves(saleRegisteredMock);
  
    // Simula a requisição e a resposta
    const req = { body: newSale };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    // Ação
    await salesController.createSale(req, res);
  
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleRegisteredMock);
  });
});
