import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || '';
type JWTreturn = string | jwt.JwtPayload;
const tokenCreate = (id: number, username: string): string => jwt
  .sign({ data: { id, username } }, secret);

const extractToken = (bearerToken:string):string => bearerToken.split(' ')[1];  

const validateToken = (bearerToken:string): boolean | JWTreturn => {
  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return false;
  }
};

export { tokenCreate, validateToken };
