import {createSlice} from '@reduxjs/toolkit';

export interface Order {
  order_id: number;
  status: string;
  total: string;
  date_created: string;
  billing: BillingDetails;
  shipping: ShippingDetails;
  line_items: LineItem[];
}

interface BillingDetails {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

interface ShippingDetails {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface LineItem {
  product_id: number;
  name: string;
  quantity: number;
  subtotal: string;
  total: string;
  sku: string;
  price: string;
}

interface OrderDetailsTypes {
  order_id: number;
  status: string;
  total: string;
  date_created: string;
  billing: BillingDetails;
  shipping: ShippingDetails;
  line_items: LineItem[];
  total_items: number;
  total_quantity: number;
}

interface orderSliceTypes {
  allOrders: Order[];
  orderDetails: OrderDetailsTypes | null;
}

const initialState = <orderSliceTypes>{
  allOrders: [],
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveAllOrders: (state, {payload}) => {
      state.allOrders = payload;
    },
    saveOrderDetails: (state, {payload}) => {
      state.orderDetails = payload;
    },
    resetOrderSlice: () => initialState,
  },
});

export const {resetOrderSlice, saveAllOrders, saveOrderDetails} =
  orderSlice.actions;

export default orderSlice.reducer;
