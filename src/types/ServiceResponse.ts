export type ServiceResponseError = {
  status: 'UNAUTHORIZED' | 'NOT_FOUND' | 'BAD_REQUEST',
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFULL' | 'CREATED',
  data: T
};

export type ServiceResponse<Data> = ServiceResponseSuccess<Data> | ServiceResponseError;