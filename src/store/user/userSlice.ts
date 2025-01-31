import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {ImageURISource} from 'react-native';
type Address = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
};

type BillingAndShipping = {
  billing_address: Address;
  shipping_address: Address;
};
export interface userDataTypes {
  ID?: number;
  username?: string;
  email?: string;
  token?: string;
}

export interface userSlicesStateTypes {
  token: null | string;
  role: null | string;
  locationDetail: {};
  route: boolean;
  routeName: boolean;

  rememberMe: boolean;
  userData: Partial<userDataTypes>;
  BillnShipAddress: BillingAndShipping;
  profileImage: ImageURISource | null;
  loginCredentials: {
    email: string;
    password: string;
  };
}

const initialState = <userSlicesStateTypes>{
  token: null,
  rememberMe: false,
  role: null,
  locationDetail: {},
  route: true,
  routeName: true,
  userData: {},
  profileImage: null,
  loginCredentials: {
    email: '',
    password: '',
  },
  BillnShipAddress: {},
};

const userSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken: (state, {payload}) => {
      const {token, rememberMe} = payload;

      // state.token = payload;
      state.token = token;
      state.rememberMe = rememberMe;

      // // Conditionally store based on remember me
      // if (rememberMe) {
      //   AsyncStorage.setItem('userToken', token);
      //   AsyncStorage.setItem('rememberMe', 'true');
      // } else {
      //   // Clear stored data if not remembered
      //   AsyncStorage.removeItem('userToken');
      //   AsyncStorage.removeItem('rememberMe');
      // }
    },
    hydrateAuth: (state, action) => {
      const {token, rememberMe} = action.payload;
      state.token = token;
      state.rememberMe = rememberMe;
    },
    saveRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    saveRoute: (state, {payload}) => {
      state.route = payload;
    },
    saveRouteName: (state, {payload}) => {
      state.routeName = payload;
    },
    saveUserData: (state, {payload}) => {
      state.userData = payload;
    },
    saveLoginCredentials: (state, {payload}) => {
      state.loginCredentials = payload;
    },
    saveBillnShipAddress: (state, {payload}) => {
      state.BillnShipAddress = payload;
    },
    saveProfileImage: (state, {payload}) => {
      state.profileImage = payload;
    },
    saveLogout: (state, {payload}) => {
      state.token = null;
      // state.rememberMe = false;
      state.userData = {};
      state.profileImage = null;
      state.route = true;
      state.profileImage = null;
      state.BillnShipAddress = {};
    },
    resetUserSlice: () => initialState,
  },
});

export const {
  resetUserSlice,
  hydrateAuth,
  saveLoginCredentials,
  setToken,
  saveRememberMe,
  saveRoute,
  saveRouteName,
  saveUserData,
  saveBillnShipAddress,
  saveProfileImage,
  saveLogout,
} = userSlices.actions;

export default userSlices.reducer;
