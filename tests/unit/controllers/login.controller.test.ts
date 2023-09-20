import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginControllers from '../../../src/controllers/login.controllers'
import loginServices, { LoginResponse } from '../../../src/services/login.services';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testa os dados retornados na rota /login, metodo post, camada controller', async function (){
    req.body = {
      "username": "Eddie",
      "password": "senhasecretadoEddie"
    }
    const mockData = {token: 'duec8y27y3dh'};
    const serviceResponse: LoginResponse = {
      status: 'SUCCESSFULL', data:  mockData 
    };
    sinon.stub(loginServices, 'authenticate').resolves(serviceResponse)
    await loginControllers.authenticate(req, res)
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith( mockData );
  })
});
