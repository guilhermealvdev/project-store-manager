// const { expect } = require('chai');
const sinon = require('sinon');
const { assert } = require('chai');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
// const conexao = require('../../../src/db/index');

describe('Teste de Products na Camada Service', function () {
  afterEach(function () {
    sinon.restore(); // Restaura os stubs após cada teste
  });

  it('Teste se getProducts do service chama getProducts do model', async function () {
    // Arranjo
    const getProductsModelStub = sinon.stub(productsModel, 'getProducts').resolves([]);
  
    // Ação
    await productsService.getProducts();
  
    // Assert
    assert.isTrue(getProductsModelStub.calledOnce);
    // Aqui não funcionou usando o expect, uma alternativa foi fazer dessa maneira.
  });

  it('Teste se getProductsId do service chama getProductsId do model', async function () {
    // Arranjo
    const productId = 1;
    const getProductsIdModelStub = sinon.stub(productsModel, 'getProductsId').resolves({});

    // Ação
    await productsService.getProductsId(productId);

    // Assert
    assert.isTrue(getProductsIdModelStub.calledOnceWith(productId));
    // Igual no teste anterior, nao funcionou com 'expect', usei assert novamente.
  });
});
