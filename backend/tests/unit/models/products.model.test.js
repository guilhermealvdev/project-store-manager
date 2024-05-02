const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const conexao = require('../../../src/db/index');

describe('Teste de Products na Camada Model', function () {
  it('Teste function getProducts', async function () {
    // Arranjo
    const products = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ];

    sinon.stub(conexao, 'query').resolves([products]);
    // sinon.stub simula funções

    // Ação
    const result = await productsModel.getProducts();
    
    // Assert / Expect
    expect(result).to.be.an('array');
    expect(result).to.deep.equal(products);
  });
});