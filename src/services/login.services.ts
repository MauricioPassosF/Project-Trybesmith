import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { tokenCreate } from '../utils/token';

type CreateLoginData = { token: string };
export type LoginResponse = ServiceResponse<CreateLoginData>;

const authenticate = async (loginInfo: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const modelResponse = await UserModel.findOne({ where: { username: loginInfo.username } });
  if (!modelResponse) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { password, id, username } = modelResponse.dataValues;
  const validatePassword = await bcrypt.compare(loginInfo.password, password); 
  
  if (!validatePassword) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const token = tokenCreate(id, username);
  
  return { status: 'SUCCESSFULL', data: { token } };
};

export default {
  authenticate,
};
