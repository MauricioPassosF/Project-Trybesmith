import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersServices from '../../../src/services/orders.services';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';

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

  it('Testa os dados retornados na rota /orders, metodo post, na camada service', async function (){ 
    const mockData = {
      "productIds": [2],
      "userId": 1,
    }

    const mockUser = {
      "username": "Eddie",
      "password": "$2a$10$BeIuIME5aZEYnnNqLWqeF.w3g9pD/z2DTo0wsLHptVfeILYSfO9a.",
      "level": 2,
      "vocation": "qualquercoisa"
    };

    const mockOrder = {
    "userId": 1,
    'id': 1
    }

    const mockCreateUserReturn = UserModel.build(mockUser);
    sinon.stub(UserModel, 'findByPk').resolves(mockCreateUserReturn);

    const mockCreateOrderReturn = OrderModel.build(mockOrder);
    sinon.stub(OrderModel, 'create').resolves(mockCreateOrderReturn);

    sinon.stub(ProductModel, 'update').resolves([1]);

    const serviceResponse = await ordersServices.create(mockData);
    expect(serviceResponse.status).to.eq('CREATED');
    expect(serviceResponse.data).to.deep.equal( mockData );
  })

  it('Testa validacao com dados incorretos na rota /orders, metodo post, na camada service', async function (){ 
    const mockData = {
      "productIds": [2],
      "userId": 1,
    }

    sinon.stub(UserModel, 'findByPk').resolves(undefined);
    const serviceResponse = await ordersServices.create(mockData);
    expect(serviceResponse.status).to.eq('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({message: '"userId" not found'});
  })

});
