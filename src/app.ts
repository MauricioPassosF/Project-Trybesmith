import express from 'express';
import productRouter from './routes/product.routes';
import ordersRouter from './routes/orders.routes';
import loginRouter from './routes/login.routers';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

export default app;
