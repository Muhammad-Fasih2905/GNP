import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, setScreenLoading, showMessage} from '../common/commonSlice';
import apiCall from '../services';
import {
  resetUserSlice,
  saveBillnShipAddress,
  saveLogout,
  saveProfileImage,
  saveUserData,
  setToken,
} from './userSlice';
import {RootState} from '../Store';
import {
  CardInfoDataTypes,
  PersonalInfoDataTypes,
} from '../../screens/AppScrees/CheckoutScreen/useCheckoutScreen';
import {ProfileInfoTypes} from '../../screens/AppScrees/ProfileScreen/useProfileScreen';
import {resetOrderSlice} from '../order/orderSlice';
import {resetProductSlice} from '../product/productSlice';

export const registerUser = createAsyncThunk(
  'register',
  async (data: object, {dispatch}) => {
    dispatch(setLoading(true));
    try {
      const res = await apiCall({
        path: 'register',
        method: 'POST',
        body: data,
      });

      if (res.status === 'success') {
        console.log('registerUser response', res);
        dispatch(showMessage(res.message));
        return res;
      } else {
        dispatch(showMessage(res.message));
        return res;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('API error response data:', error.response.data);
        throw new Error(
          error.response.data.message ||
            'An error occurred during registration',
        );
      } else {
        console.log('error11: ', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const loginUser = createAsyncThunk(
  'login',
  async (data: {data: object; rememberMe: boolean}, {dispatch}) => {
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'login',
        method: 'POST',
        params: data.data,
      });
      // return
      // if (res?.status === "success") {
      if (!res) {
        return false;
      }
      console.log('loginUser response', res);
      dispatch(saveUserData(res));
      dispatch(setToken({token: res.token, rememberMe: data.rememberMe}));

      res?.message && dispatch(showMessage(res?.message));

      return res;

      // } else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      if (error.response && error.response.data) {
        error?.response?.data?.message &&
          dispatch(showMessage(error?.response?.data?.message));
        console.log('API error response data:', error.response.data);
        // throw new Error(
        //   error.response.data.message ||
        //     'An error occurred during registration',
        // );
      } else {
        console.log('error11: ', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const resetPassword = createAsyncThunk(
  'reset-password',
  async (data: object, {dispatch}) => {
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'reset-password',
        method: 'POST',
        params: data,
      });

      // console.log('res: ', res);

      // if (res.success === true) {
      console.log('resetPassword response: ', res);

      res?.message && dispatch(showMessage(res?.message));
      return true;
      // } else {
      //   dispatch(showMessage(res.message));
      //   return false;
      // }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('API error response data:', error.response.data);
        throw new Error(
          error.response.data.message ||
            'An error occurred during registration',
        );
      } else {
        console.log('error11: ', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);
export const forgotPassword = createAsyncThunk(
  'forgot-password',
  async (data: object, {dispatch}) => {
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'forgot-password',
        method: 'POST',
        params: data,
      });

      // console.log('res: ', res);

      // if (res.success === true) {
      console.log('forgot-password response: ', res);

      res?.message && dispatch(showMessage(res?.message));
      return true;
      // } else {
      //   dispatch(showMessage(res.message));
      //   return false;
      // }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('API error response data:', error.response.data);
        throw new Error(
          error.response.data.message ||
            'An error occurred during registration',
        );
      } else {
        console.log('error11: ', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const logout = createAsyncThunk(
  'logout',
  async (data: object, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      const res = await apiCall({
        path: 'logout?',
        method: 'POST',
        params: data,
        token: token,
      });
      if (res?.success === true) {
        // dispatch(resetUserSlice());
        dispatch(resetProductSlice());
        dispatch(resetOrderSlice());
        dispatch(saveLogout({}));
        // dispatch(setToken({token: null, rememberMe: false}));
        dispatch(showMessage(res?.message));
      }
      return res;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('API error response data:', error.response.data);
        throw new Error(
          error.response.data.message ||
            'An error occurred during registration',
        );
      } else {
        console.log('error11: ', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const addAddress = createAsyncThunk(
  'set-address',
  async (data: PersonalInfoDataTypes, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'set-address',
        method: 'POST',
        token: token,
        params: data,
      });

      if (res?.status === 'success') {
        console.log('set-address response', res);
        return true;
      }
      // else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('set-address error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const addbillingAddress = createAsyncThunk(
  'set-billing-address',
  async (data: any, {dispatch, getState}) => {
    console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      const res = await apiCall({
        path: 'set-billing-address',
        method: 'POST',
        token: token,
        params: data,
      });
      console.log('set-billing-address response', res);
      if (res?.status === 'success') {
        dispatch(showMessage(res.message));
      }
      return res;
    } catch (error: any) {
      console.log('set-address error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const addShippingAddress = createAsyncThunk(
  'set-shipping-address',
  async (data: any, {dispatch, getState}) => {
    console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      const res = await apiCall({
        path: 'set-shipping-address',
        method: 'POST',
        token: token,
        params: data,
      });
      console.log('set-address response', res);
      if (res?.status === 'success') {
        dispatch(showMessage(res.message));
      }
      return res;
    } catch (error: any) {
      console.log('set-address error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const fetchBillingNShippingAddress = createAsyncThunk(
  'get-address',
  async (data: {user_id: number}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: 'get-address',
        method: 'GET',
        token: token,
        params: {user_id: data.user_id},
      });
      console.log('res', res);

      dispatch(saveBillnShipAddress(res));

      // if (res?.status === 'success') {
      // console.log('get-address response', res);
      return res;
      // }
      // else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('get-address error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const addCardInfo = createAsyncThunk(
  'add-payment-method',
  async (data: CardInfoDataTypes, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'add-payment-method',
        method: 'POST',
        token: token,
        body: data,
      });

      console.log('add-payment-method res:', res);
      return res;

      // if (res?.status === 'success') {
      //   console.log('Add card info', res);
      //   return true;
      // }
      // else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('add-payment-method error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getMyAccountDetails = createAsyncThunk(
  'account-details',
  async (data: {user_id: number | undefined}, {dispatch, getState}) => {
    console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: `get-account-details/${data.user_id}`,
        method: 'GET',
        token: token,
      });

      console.log('account-details response', res);
      return res;
    } catch (error: any) {
      console.log('account-details error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const updateMyAccountDetails = createAsyncThunk(
  'update-account-details',
  async (data: ProfileInfoTypes, {dispatch, getState}) => {
    console.log('data: ', data);
    const state = getState() as RootState;
    const user_id = state.userSlice.userData.ID;
    const token = state.userSlice.token;
    try {
      // console.log('updateMyAccountDetails input data', data);
      dispatch(setLoading(true));
      // console.log("userId:::", user_id)
      const res = await apiCall({
        path: `account-details/${user_id}`,
        method: 'POST',
        isJson: true,
        token: token,
        body: JSON.stringify(data),
      });

      console.log('updateMyAccountDetails response', res);
      dispatch(showMessage(res.message));
      return true;
    } catch (error: any) {
      console.log('account-details error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateProfilePic = createAsyncThunk(
  'update-profile-picture',
  async (data: any, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    console.log('updatePassword input data', data);
    try {
      dispatch(setLoading(true));
      const res = await apiCall({
        path: `update-profile-picture`,
        method: 'POST',
        token: token,
        isForm: true,
        body: data,
      });
      console.log('update Picture response', res);
      if (res?.success) {
        dispatch(saveProfileImage(res?.profile_picture_url));
        // dispatch(showMessage(res.message));
      }
      return true;
    } catch (error: any) {
      // console.log('account-details error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);
export const updatePassword = createAsyncThunk(
  'reset-password',
  async (data: any, {dispatch, getState}) => {
    console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      console.log('updatePassword input data', data);
      dispatch(setLoading(true));

      const res = await apiCall({
        path: `reset-password`,
        method: 'POST',
        token: token,
        params: data,
      });

      console.log('updatePassword response', res);
      return true;
    } catch (error: any) {
      console.log('account-details error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);
