import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginServices from '../../../src/services/login.services';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testa os dados retornados na rota /login, metodo post, camada service', async function (){
    const mockData = {
        "username": "Eddie",
        "password": "$2a$10$BeIuIME5aZEYnnNqLWqeF.w3g9pD/z2DTo0wsLHptVfeILYSfO9a.",
        "id": 1,
        "level": 2,
        "vocation": "qualquercoisa"
    };
    const mockParameters = {
      "username": "Eddie",
      "password": "sortudo",
    }
    const mockCreateReturn = UserModel.build(mockData)
    sinon.stub(UserModel, 'findOne').resolves(mockCreateReturn)
    const serviceResponse = await loginServices.authenticate(mockParameters)
    expect(serviceResponse.status).to.eq('SUCCESSFULL');
    // expect(serviceResponse.data).to.be.ob
  })
});
