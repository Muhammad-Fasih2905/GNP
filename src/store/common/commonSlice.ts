import {createSlice} from '@reduxjs/toolkit';
import {Platform, ToastAndroid, Alert} from 'react-native';

const commonSlice = createSlice({
  name: 'user',
  initialState: {
    tokenHold: null,
    isLoading: false,
    isScreenLoading: false,
    isCategoryLoading: false
  },
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setScreenLoading: (state, {payload}) => {
      state.isScreenLoading = payload;
    },
    setCategoryLoading: (state, {payload}) => {
      state.isCategoryLoading = payload;
    },
    setTokenHold: (state, {payload}) => {
      state.tokenHold = payload;
    },
    showMessage: (_, {payload}) => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(payload, ToastAndroid.SHORT);
      } else {
        Alert.alert('', payload);
      }
    },
  },
});

export const {setLoading, setTokenHold, showMessage, setCategoryLoading, setScreenLoading} = commonSlice.actions;
export default commonSlice.reducer;
