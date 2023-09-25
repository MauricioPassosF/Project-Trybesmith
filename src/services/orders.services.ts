// import db from '../database/models';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

// type ProductIds = { products: number[] };
// type GetAllOrdersResponseData = Order & ProductIds;
// export type CreateProductResponse = ServiceResponse<CreateProductResponseData>;
export type GetAllOrdersResponse = ServiceResponse<Order[]>;
type CreateOrderData = {
  userId: number;
  productIds: number[];
};
export type CreateOrderResponse = ServiceResponse<CreateOrderData>;
const getAll = async (): Promise<GetAllOrdersResponse> => {
  const modelResponse = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });
  const orders = modelResponse.map((order) => order.toJSON());
  const formattedOrders = orders.map(({ id, userId, productIds }) => {
    const productsid = (productIds as { id: number }[]).map((product) => product.id);
    return { id, userId, productIds: productsid };
  });
  return { status: 'SUCCESSFULL', data: formattedOrders };
};

const create = async ({ userId, productIds }: CreateOrderData): Promise<CreateOrderResponse> => {
  const userModelResponse = await UserModel.findByPk(userId);
  if (!userModelResponse) {
    return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  }
  // const t = await db.transaction();
  // try {
  const orderModelResponse = await OrderModel.create({ userId });
  // const orderModelResponse = await OrderModel.create({ userId }, { transaction: t });
  const { id } = orderModelResponse.dataValues;
  // console.log(id);
  const productModelResponse = productIds.map(async (productId) => {
    // await ProductModel.update({ orderId: id }, { where: { id: productId }, transaction: t });
    await ProductModel.update({ orderId: id }, { where: { id: productId } });
  });
  Promise.all(productModelResponse);
  // await t.commit();
  return { status: 'CREATED', data: { userId, productIds } };
  // } catch (error) {
  //   await t.rollback();
  //   throw error;
  // }
};

export default {
  getAll,
  create,
};
