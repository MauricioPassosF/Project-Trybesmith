import express from 'express';
import productRouter from './routes/product.routes';
import ordersRouter from './routes/orders.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

export default app;
