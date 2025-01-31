import {StyleSheet, Text, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useEffect, useState} from 'react';
import {
  getMyAccountDetails,
  updatePassword,
} from '../../../store/user/userAction';
import {useNavigation} from '@react-navigation/native';

export interface MyAccountDetailsTypes {
  // user_id: number | undefined;
  first_name: string;
  last_name: string;
  email: string;
  // current_password: string;
  new_password: string;
  // confirm_password: string;
}

const useAccountDetails = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const userData = useAppSelector(state => state.userSlice.userData);
  const [detailsFetching, setDetailsFetching] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    unregister,
    getValues,
    setValue,
    formState: {errors},
    reset,
  } = useForm<MyAccountDetailsTypes>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      // current_password: '',
      new_password: '',
      // confirm_password: '',
    },
  });

  useEffect(() => {
    const fetchMyAccountDetails = async () => {
      try {
        setDetailsFetching(true);
        const response = await dispatch(
          getMyAccountDetails({user_id: userData.ID}),
        ).unwrap();
        setValue('first_name', response.first_name || '');
        setValue('last_name', response.last_name || '');
        setValue('email', response.email || '');
      } catch (error) {
        console.log(error);
      } finally {
        setDetailsFetching(false);
      }
    };

    fetchMyAccountDetails();
  }, []);

  const onSubmit = async (data: MyAccountDetailsTypes) => {
    try {
      //   setValue('user_id', userData.ID);
      const myAccountDetailsObj = {
        password: data.new_password,
        email: userData.email,
      };

      const response = await dispatch(
        updatePassword(myAccountDetailsObj),
      ).unwrap();
      if (response) {
        navigation.navigate('HomeScreen');
      }
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
    detailsFetching,
  };
};

export default useAccountDetails;

const styles = StyleSheet.create({});
