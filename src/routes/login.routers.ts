import { Router } from 'express';
import loginControllers from '../controllers/login.controllers';
import loginMiddle from '../middlewares/loginMiddle';

const loginRouter = Router();

loginRouter.post(
  '/',
  loginMiddle.validateFields,
  loginControllers.authenticate,
);

export default loginRouter;