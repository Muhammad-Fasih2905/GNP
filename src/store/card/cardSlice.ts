import {createSlice} from '@reduxjs/toolkit';
import {CardInfoDataTypes} from '../../screens/AppScrees/PaymentMethod/usePaymentMethod';

export interface cardSliceStateTypes {
  paymentCardInfo: {
    id: number;
    method: string;
    last4: string;
    expiry_month: string;
    expiry_year: string;
    is_default: boolean;
  }[];
}

const cardSlice = createSlice({
  name: 'card',
  initialState: <cardSliceStateTypes>{
    paymentCardInfo: [],
  },
  reducers: {
    savePaymentCardInfo: (state, {payload}) => {
      state.paymentCardInfo = payload;
    },
  },
});

export const {savePaymentCardInfo} = cardSlice.actions;

export default cardSlice.reducer;
