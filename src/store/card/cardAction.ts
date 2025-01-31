import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, setScreenLoading, showMessage} from '../common/commonSlice';
import apiCall from '../services';
import {RootState} from '../Store';
import {savePaymentCardInfo} from './cardSlice';

export const fetchPaymentCardInfo = createAsyncThunk(
  'payment-methods',
  async (data: {user_id: number | undefined}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;

    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));

      console.log('wqdq', data.user_id);
      // return

      const res = await apiCall({
        path: `payment-methods`,
        method: 'GET',
        token: token,
        params: {user_id: data.user_id},
      });
      console.log('fetchPaymentCardInfo res: ', res);

      if (res?.status === 'success') {
        dispatch(showMessage(res?.message));
        dispatch(savePaymentCardInfo(res));
      } else {
        dispatch(showMessage(res.message));
        return res;
      }
      return true;
    } catch (error: any) {
      console.log('fetchPaymentCardInfo error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);
