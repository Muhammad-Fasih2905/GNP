import {ViewStyle} from 'react-native';

export interface AuthLayoutProps {
  children?: any;
  backgroundImage?: boolean;
  childContainerStyle?: ViewStyle;
  statusBarStyle?: string;
}

export interface AppLayoutProps {
  children?: any;
  childContainerStyle?: ViewStyle;
}

export interface LoginDataTypes {
  email: string;
  password: string;
}

export interface ResetPasswordDataTypes {
  email: string;
}

export interface SignUpDataTypes {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AddressTypes {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postcode: string;
}

export interface CardInfoDataTypes {
  user_id: number | undefined;
  number: string;
  expiry_year: string;
  expiry_month: string;
  cvc: string;
}

export interface PersonalInfoDataTypes {
  user_id: number | undefined;
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
}


export interface CardInputTypes {
  number: string;
  expiry_date: string;
  cvc: string;
  card_type: string
}