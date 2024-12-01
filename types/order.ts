export interface IOrderDetailResponse {
  id: number;
  quantity: number;
  step: number;
  discountPercent: number;
  dishId: number;
  dishName: string;
  dishPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderResponse {
  id: number;
  tableId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderDetails: IOrderDetailResponse[];
}
