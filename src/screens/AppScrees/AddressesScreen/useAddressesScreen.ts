import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  addAddress,
  fetchBillingNShippingAddress,
} from '../../../store/user/userAction';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';

export interface AddressTypes {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postcode: string;
}

const useAddressesScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const isScreenLoading = useAppSelector(state => state.commonSlice.isScreenLoading);
  const userData = useAppSelector(state => state.userSlice.userData);
  const BillnShipAddress =  useAppSelector(
    state => state.userSlice.BillnShipAddress,
  );
  const currentlyEditting =useRef(0)
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    unregister,
    getValues,
    setValue,
    formState: {errors},
    reset,
  } = useForm<AddressTypes>({
    defaultValues: {
      first_name: '',
      last_name: '',
      address_1: '',
      city: '',
      postcode: '',
    },
  });

  useEffect(() => {
    const getShippingNBillingAddress = async () => {
      try {
        // console.log(userData.ID)
        // return
        if (userData.ID) {
          const response = await dispatch(
            fetchBillingNShippingAddress({user_id: userData.ID}),
          ).unwrap();
        }
      } catch (error) {
        console.log('getShippingNBillingAddress error:', error);
      }
    };

    getShippingNBillingAddress();
  }, []);

  const onSubmit = async (data: AddressTypes) => {
    try {
      // const myAccountDetailsObj = {
      //   ...data,
      //   user_id: userData.ID,
      // };

      // const response = await dispatch(addAddress(myAccountDetailsObj)).unwrap();
      // if (response) {
      //   navigation.navigate('HomeScreen');
      // }
      // console.log(myAccountDetailsObj);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    getValues,
    BillnShipAddress,
    userData,
    isScreenLoading
  };
};

export default useAddressesScreen;

const styles = StyleSheet.create({});

// const { control, errors, handleSubmit, onSubmit, isLoading, BillnShipAddress, userData, isScreenLoading } = useAddressesScreen();