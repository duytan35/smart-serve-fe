export interface IOrderDetail {
  id: number;
  orderId?: number;
  tableId?: number;
  quantity: number;
  step: number;
  discountPercent: number;
  dishId: number;
  dishName: string;
  dishPrice: number;
  dishDescription?: string;
  note?: string;
  groupOrderNumber: number;
  imageIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: number;
  tableId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderDetails: IOrderDetail[];
}

export interface IWebSocketMessage {
  data: any;
  event: string;
}
