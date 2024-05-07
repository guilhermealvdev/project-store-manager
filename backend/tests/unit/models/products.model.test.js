const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const conexao = require('../../../src/db/index');

describe('Teste de Products na Camada Model', function () {
  afterEach(function () {
    sinon.restore(); // Restaura os stubs após cada teste
  });
  
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

  it('Teste function getProductsId: ID entre 1 e 3', async function () {
    // Arranjo
    const productId = 1;
    const expectedProduct = { id: 1, name: 'Martelo de Thor' };
    sinon.stub(conexao, 'query').resolves([[expectedProduct]]);

    // Ação
    const result = await productsModel.getProductsId(productId);

    // Assert / Expect
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.deep.equal(expectedProduct);
  });

  it('Teste function getProductsId: ID >= 4', async function () {
    // Arranjo
    const productId = 4;
    sinon.stub(conexao, 'query').resolves([[]]); // Simula a ausência de resultados

    // Ação
    const result = await productsModel.getProductsId(productId);

    // Assert / Expect
    expect(result).to.deep.equal([]);
  });
  it('Deve chamar a query correta para deletar um produto', async function () {
    // Arranjo
    const queryStub = sinon.stub(conexao, 'query');

    // Ação
    await productsModel.deleteProduct(1);

    // Assert
    expect(queryStub).to.have.been.calledWith('DELETE FROM products WHERE id = ?', [1]);
  });

  it('Deve chamar a query correta para atualizar um produto', async function () {
    // Arranjo
    const queryStub = sinon.stub(conexao, 'query');

    // Ação
    await productsModel.updateProduct(1, 'Martelo de Thor');

    // Assert
    expect(queryStub).to.have.been.calledWith('UPDATE products SET name = ? WHERE id = ?', ['Martelo de Thor', 1]);
  });
});
