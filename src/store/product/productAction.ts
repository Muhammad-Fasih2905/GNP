import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  setCategoryLoading,
  setLoading,
  setScreenLoading,
  showMessage,
} from '../common/commonSlice';
import apiCall from '../services';
import {RootState} from '../Store';
import {
  saveAllOrders,
  saveClientReviews,
  saveCurrentCategoryBooks,
  saveProductCategories,
  saveRelatedBooks,
  saveSearchedItems,
  saveToCart,
  saveTopTrendingBooks,
  saveVanguardBook,
  saveWebComics,
  setSearchLoading,
  setTrendingBooksLoading,
  setWebComicsLoading,
} from './productSlice';
import {setToken} from '../user/userSlice';

export const fetchTrendingBooks = createAsyncThunk(
  'trending-books',
  async (_, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      // dispatch(setLoading(true));
      // dispatch(setScreenLoading(true));
      dispatch(setTrendingBooksLoading(true));

      const res = await apiCall({
        path: 'trending-books',
        method: 'GET',
        token: token,
      });

      // if (res.success === true) {
      // console.log('fetchTrendingBooks response', res);

      dispatch(saveTopTrendingBooks(res));
      // dispatch(showMessage(res?.message));

      return true;
      // } else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('fetchClientReviews error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      // dispatch(setLoading(false));
      // dispatch(setScreenLoading(false));
      dispatch(setTrendingBooksLoading(false));
    }
  },
);
export const getVanguardBook = createAsyncThunk(
  'product',
  async (data: {productId: number}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));
      //currenly fetching book with static data
      const res = await apiCall({
        path: `product/${data.productId}`,
        method: 'GET',
        token: token,
      });
      // console.log("getVanguardBook res: ", res)

      dispatch(saveVanguardBook(res));

      return true;
    } catch (error: any) {
      console.log('getVanguardBook error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);
export const getRelatedBooks = createAsyncThunk(
  'related-products',
  async (data: {product_id: number}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));
      //currenly fetching book with static data
      const res = await apiCall({
        path: 'related-products',
        method: 'GET',
        params: {product_id: data.product_id},
        token: token,
      });

      dispatch(saveRelatedBooks(res));

      return true;
    } catch (error: any) {
      console.log('getVanguardBook error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const fetchProductCategories = createAsyncThunk(
  'product-categories',
  async (_, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'product-categories',
        method: 'GET',
        token: token,
      });

      // if (res.success === true) {
      // console.log('fetchTrendingBooks response', res);

      dispatch(saveProductCategories(res));
      // dispatch(showMessage(res?.message));

      return true;
      // } else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('product-categories error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);
export const fetchClientReviews = createAsyncThunk(
  'client-reviews',
  async (_, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'client-reviews',
        method: 'GET',
        token: token,
      });

      // if (res.success === true) {
      // console.log('fetchTrendingBooks response', res);

      dispatch(saveClientReviews(res));
      // dispatch(showMessage(res?.message));

      return true;
      // } else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('product-categories error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const addToCartBook = createAsyncThunk(
  'add-to-cart',
  async (
    data: {quantity: number; product_id: number; user_id: number},
    {dispatch, getState},
  ) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    console.log('data: ', data);
    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'add-to-cart',
        method: 'POST',
        token: token,
        body: data,
      });

      if (res?.status === 'success') {
        console.log('addToCartBook response', res);

        return res;
      }
    } catch (error: any) {
      console.log('product-categories error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);
export const removeCartItem = createAsyncThunk(
  'remove-cart-item',
  async (
    data: {cart_item_key: string; user_id: number},
    {dispatch, getState},
  ) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;

    try {
      dispatch(setLoading(true));

      const res = await apiCall({
        path: 'remove-cart-item',
        method: 'POST',
        token: token,
        body: data,
      });
      console.log('remove-cart-item res:', res);

      return true;

      // if (res?.status === 'success') {
      //   console.log('removeCartItem response', res);

      //   return res;
      // }
    } catch (error: any) {
      console.log('removeCartItem error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const fetchCartItems = createAsyncThunk(
  'get-cart-items',
  async (_, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    const user_id = state.userSlice.userData.ID;
    // console.log('data: ', data);
    try {
      dispatch(setLoading(true));
      dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: 'get-cart-items',
        method: 'GET',
        token: token,
        params: {user_id: user_id},
      });

      // console.log('fetchCartItems response', res);
      if (res?.cart_items?.length > 0) {
        dispatch(saveToCart(res?.cart_items));
      } else {
        dispatch(saveToCart([]));
      }

      // dispatch(showMessage(res?.message));

      return res;
    } catch (error: any) {
      console.log('get-cart-items error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setScreenLoading(false));
    }
  },
);

export const fetchBooksByCategory = createAsyncThunk(
  'products',
  async (data: {categoryId: number}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    const userData = state.userSlice.userData;
    // console.log('data: ', data);
    console.log(userData.ID);
    try {
      dispatch(setLoading(true));
      dispatch(setCategoryLoading(true));

      const res = await apiCall({
        path: 'products',
        method: 'GET',
        token: token,
        params: {category_id: data.categoryId},
      });

      // console.log('fetchBooksByCategory response', res);
      if (res?.length === 0) {
        dispatch(saveCurrentCategoryBooks([]));
      } else {
        // dispatch(saveCurrentCategoryBooks([])); //saving empty coz of duplicate id issue
        dispatch(saveCurrentCategoryBooks(res?.flat(1)));
      }

      // dispatch(showMessage(res?.message));

      return true;
      // }
      // else {
      //   dispatch(showMessage(res.message));
      //   return res;
      // }
    } catch (error: any) {
      console.log('product-categories error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
      dispatch(setCategoryLoading(false));
    }
  },
);

export const getWebComics = createAsyncThunk(
  'web-comics',
  async (_, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    try {
      dispatch(setLoading(true));
      dispatch(setWebComicsLoading(true));
      const res = await apiCall({
        path: 'web-comics',
        method: 'GET',
        token: token,
      });
      // console.log('getWebComics Res: ', res);
      dispatch(saveWebComics(res));
      // dispatch(showMessage(res?.message));

      return true;
    } catch (error: any) {
      console.log('web-comics error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setWebComicsLoading(false));
      dispatch(setLoading(false));
    }
  },
);

export const applyCouponCode = createAsyncThunk(
  'apply-coupon',
  async (
    data: {coupon_code: string; user_id: number},
    {dispatch, getState},
  ) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // console.log('data: ', data);
    try {
      // dispatch(setLoading(true));
      // dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: 'apply-coupon',
        method: 'POST',
        params: {coupon_code: data.coupon_code, user_id: data.user_id},
        token: token,
      });
      return true;

      dispatch(showMessage(res?.message));

      return true;
    } catch (error: any) {
      console.log('applyCouponCode error: ', error);
      throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      // dispatch(setLoading(false));
      // dispatch(setScreenLoading(false));
    }
  },
);

export const searchABook = createAsyncThunk(
  'product-search',
  async (data: {search_term: string}, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    console.log('data: ', data.search_term);
    try {
      dispatch(setSearchLoading(true));
      // dispatch(setLoading(true));
      // dispatch(setScreenLoading(true));

      const res = await apiCall({
        path: 'product-search',
        method: 'GET',
        params: {search_term: data.search_term},
        token: token,
      });

      console.log('searchABook res: length', res?.length);
      if (res?.length > 0) {
        dispatch(saveSearchedItems(res));
        return true;
      } else {
        dispatch(saveSearchedItems([]));
        return false;
      }
    } catch (error: any) {
      console.log('searchABook error: ', error);
      // throw new Error('An unexpected error occurred. Please try again.');
    } finally {
      dispatch(setSearchLoading(false));
      // dispatch(setLoading(false));
      // dispatch(setScreenLoading(false));
    }
  },
);
