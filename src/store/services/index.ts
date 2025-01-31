import axios from 'axios';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// export const BASE_URL = 'https://blended.letsgetwebdesign.com/api/';
// export const BASE_URL = 'https://linkedink.infinityprojectmanager.com:3321/v1/auth/';
export const BASE_URL = 'https://graydonpnavarre.com/wp-json/app/v1/';

interface props {
  path: string;
  isForm?: boolean;
  method?: string;
  url?: any;
  body?: any;
  token?: any;
  params?: any;
  isJson?: any;
}

const apiCall = async ({
  path,
  method = 'GET',
  isForm,
  url = null,
  body = null,
  token = null,
  params = null,
  isJson = false,
}: props) => {
  let urlString = BASE_URL + path;
  let headers: any = {
    ...(isForm
      ? {
          'Content-Type': 'multipart/form-data',
          // 'x-api-key': '08KIdct2MAQ6B1Kr5lfVTj5GAdkwuF6i',
        }
      : {
          'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded',
          // 'x-api-key': '08KIdct2MAQ6B1Kr5lfVTj5GAdkwuF6i',
          //  'Content-Type': 'application/json',
          Accept: 'application/x-www-form-urlencoded, application/json',
        }),
  };
  let options: any = {
    method,
  };
  if (token) headers['authorization'] = 'Bearer ' + token;
  options.headers = headers;
  if (body) options.data = body;
  // console.log('path   : ', path );
  if (params) options.params = params;
  if (url) urlString = url;
  options.url = urlString;
  // console.log('options: ', options);

  try {
    // console.log(options)
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if (error?.response) {
      console.log('API ERROR', error?.response.data?.message);
    }
    console.log('error: ', error);

    // Check for internet connectivity
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected === false) {
      Alert.alert('', 'No Internet Connection');
    }

    // Propagate the error
    throw error;
  }
};

export default apiCall;
