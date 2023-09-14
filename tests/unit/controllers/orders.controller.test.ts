import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersServices, {GetAllOrdersResponse} from '../../../src/services/orders.services'
import ordersControllers from '../../../src/controllers/orders.controllers';


chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testa os dados retornados na rota /orders, metodo get', async function (){    
    const mockData = [
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
    const serviceResponse: GetAllOrdersResponse = {
      status: 'SUCCESSFULL', data:  mockData 
    }
    sinon.stub(ordersServices, 'getAll').resolves(serviceResponse)
    await ordersControllers.getAll(req, res)
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith( mockData );
  })

});
