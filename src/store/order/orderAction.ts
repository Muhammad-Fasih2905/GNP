import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setScreenLoading, showMessage } from '../common/commonSlice';
import apiCall from '../services';
import { RootState } from '../Store';
import { saveAllOrders, saveOrderDetails } from './orderSlice';

export const fetchAllOrders = createAsyncThunk(
  'user-orders',
  async (data: { user_id: number }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    //   console.log('data: ', data.user_id);
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: `user-orders`,
        method: 'GET',
        token: token,
        params: { user_id: data.user_id },
      });
      console.log('res', res);

      dispatch(saveAllOrders(res));

      // if (res?.status === 'success') {
      // console.log('fetchBooksByCategory response', res);

      // dispatch(showMessage(res?.message));
      // dispatch(saveAllOrders(res))

      return true;
      // }
      // else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('fetchAllOrders error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const fetchOrderDetails = createAsyncThunk(
  'order-details',
  async (data: { order_id: number; user_id: number }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    //   console.log('data: ', data.user_id);
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));
      const res = await apiCall({
        path: `order-details`,
        method: 'GET',
        token: token,
        params: { user_id: data.user_id, order_id: data.order_id },
      });
      console.log('fetchOrderDetails res', res);

      if (res) {
        dispatch(saveOrderDetails(res));
      }
      return true;
    } catch (error: any) {
      console.log('fetchOrderDetails error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const placeOrder = createAsyncThunk(
  'pay-and-place-order',
  async (data: object, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dyYXlkb25wbmF2YXJyZS5jb20iLCJpYXQiOjE3MzQ2MDQ2OTAsImV4cCI6MTczNDY5MTA5MCwidXNlcl9pZCI6MX0.Av2FYa0_GfL2e23gqlWvpgHgA14Pm9tyJCs4rQd7Gmc"

    try {
      // dispatch(setLoading(true));
      // dispatch(setScreenLoading(true));
      const res = await apiCall({
        path: `pay-and-place-order`,
        method: 'POST',
        token: token,
        body: data,
      });
      console.log('placeOrder res', res);

      if (res) {

      }
      return true;
    } catch (error: any) {
      console.log('placeOrder error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      // dispatch(setLoading(false));
      // dispatch(setScreenLoading(false));
    }
  },
);

export const cancelSubscription = createAsyncThunk(
  'cancelSubscription',
  async (userID: any, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      // dispatch(setLoading(true));
      const res = await apiCall({
        path: `check-subscription/?user_id=${userID}`,
        method: 'GET',
        token: token,
      });
      console.log('placeOrder res', res);

      if (res) {
        showMessage(res?.message)
      }
      return true;
    } catch (error: any) {
      console.log('placeOrder error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      // dispatch(setLoading(false));
      // dispatch(setScreenLoading(false));
    }
  },
);