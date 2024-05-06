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

  // NOTME
  it('Deve retornar status 200 e o produto correto para getProductsId quando o produto existe', async function () {
    // Arranjo
    const productMock = { id: 1, name: 'Martelo de Thor' };
    sinon.stub(productsService, 'getProductsId').resolves([productMock]);

    // Simula a requisição e a resposta
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await productsController.getProductsId(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock);
  });

  it('Deve retornar status 404 quando o produto não existe para getProductsId', async function () {
    // Arranjo
    sinon.stub(productsService, 'getProductsId').resolves([]);

    // Simula a requisição e a resposta
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await productsController.getProductsId(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deve retornar status 201 e o produto criado para postProducts quando os dados são válidos', async function () {
    // Arranjo
    const productName = 'Martelo de Thor';
    const newProductMock = { id: 1, name: productName };
    sinon.stub(productsService, 'postProduct').resolves(newProductMock);

    // Simula a requisição e a resposta
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await productsController.postProducts(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Deve retornar status 400 quando o campo name está ausente para postProducts', async function () {
    // Simula a requisição e a resposta
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await productsController.postProducts(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Deve retornar status 422 quando o campo name tem menos de 5 caracteres para postProducts', async function () {
    // Simula a requisição e a resposta
    const req = { body: { name: 'ABC' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Ação
    await productsController.postProducts(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});
