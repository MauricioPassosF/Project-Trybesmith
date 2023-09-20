import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersServices from '../../../src/services/orders.services';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testa os dados retornados na rota /orders, metodo get, na camada service', async function (){ 
    const mockData = [
      {
        "id": 1,
        "userId": 2,
        "productIds": [{"id":1}, {"id":2}]
      },
      {
        "id": 2,
        "userId": 1,
        "productIds": [{"id":3}, {"id":4}]
      }
    ];
    const mockReturn = [
      {
        "id": 1,
        "userId": 2,
        "productIds": [1, 2]
      },
      {
        "id": 2,
        "userId": 1,
        "productIds": [3, 4]
      }
    ];

    const mockCreateReturn = OrderModel.bulkBuild(mockData,{
      include: [{
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      }],
    });
    sinon.stub(OrderModel, 'findAll').resolves(mockCreateReturn);
    const serviceResponse = await ordersServices.getAll();
    expect(serviceResponse.status).to.eq('SUCCESSFULL');
    expect(serviceResponse.data).to.deep.equal( mockReturn );
  })

});
