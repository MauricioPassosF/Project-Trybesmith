import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsServices, { CreateProductResponse, GetAllProductsResponse } from '../../../src/services/products.services'
import productControllers from '../../../src/controllers/product.controllers';


chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testa os dados retornados na rota /products, metodo post', async function (){
    req.body = {
        "name": "Martelo de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    }
    
    const mockData = {name: "Martelo de Thor", id: 4, price: '30 peças de ouro'}
    const serviceResponse: CreateProductResponse = {
      status: 'CREATED', data:  mockData 
    }
    sinon.stub(productsServices, 'create').resolves(serviceResponse)
    await productControllers.create(req, res)
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith( mockData );
  })

  it('Testa os dados retornados na rota /products, metodo get', async function (){    
    const mockData = [
      {
        "id": 1,
        "name": "Pedra Filosofal",
        "price": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Lança do Destino",
        "price": "100 diamond",
        "orderId": 1
      }
    ]
    const serviceResponse: GetAllProductsResponse = {
      status: 'SUCCESSFULL', data:  mockData 
    }
    sinon.stub(productsServices, 'getAll').resolves(serviceResponse)
    await productControllers.getAll(req, res)
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith( mockData );
  })


});
