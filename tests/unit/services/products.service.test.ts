import { expect } from 'chai';
import sinon from 'sinon';
import { Product } from '../../../src/types/Product';
import ProductModel, { ProductInputtableTypes, ProductSequelizeModel } from '../../../src/database/models/product.model';
import productsServices from '../../../src/services/products.services';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testa os dados retornados na rota /products, metodo post, na camada service', async function (){ 
    const mockParameters = {name: "Martelo de Thor", price: '30 peças de ouro', orderId: 1};
    const mockData = {name: "Martelo de Thor", id: 4, price: '30 peças de ouro', orderId: 1};
    const mockReturn = {name: "Martelo de Thor", id: 4, price: '30 peças de ouro'};
    const mockCreateReturn = ProductModel.build(mockData);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    const serviceResponse = await productsServices.create(mockParameters);
    expect(serviceResponse.status).to.eq('CREATED');
    expect(serviceResponse.data).to.deep.equal( mockReturn );
  })

  // it('Testa os dados retornados na rota /products, metodo get, na camada service', async function (){ 
  //   const mockData = [
  //     {
  //       "id": 1,
  //       "name": "Pedra Filosofal",
  //       "price": "20 gold",
  //       "orderId": null
  //     },
  //     {
  //       "id": 2,
  //       "name": "Lança do Destino",
  //       "price": "100 diamond",
  //       "orderId": 1
  //     }
  //   ];
  //   const mockReturn = {name: "Martelo de Thor", id: 4, price: '30 peças de ouro'};
  //   const mockCreateReturn = ProductModel.build(mockData);
  //   sinon.stub(ProductModel, 'findAll').resolves(mockCreateReturn);
  //   const serviceResponse = await productsServices.getAll();
  //   expect(serviceResponse.status).to.eq('SUCCESSFUL');
  //   expect(serviceResponse.data).to.deep.equal( mockReturn );
  // })
});
