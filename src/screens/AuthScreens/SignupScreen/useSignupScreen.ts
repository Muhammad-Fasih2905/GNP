import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '../../../store/user/userAction';
import {showMessage} from '../../../store/common/commonSlice';
import {setToken} from '../../../store/user/userSlice';

interface SignUpDataTypes {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const useSignupScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
  } = useForm<SignUpDataTypes>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    },
  });

  const goToPrevScreen = () => {
    navigation.goBack();
  };

  const onSubmit = async (data: SignUpDataTypes) => {
    // return
    try {
      const res = await dispatch(registerUser(data)).unwrap();

      if (res.status === 'success') {
        console.log('res');
        navigation.navigate('LoginScreen');
      } else {
        dispatch(showMessage(res.message));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(showMessage(error.message));
    }
  };

  return {control, errors, onSubmit, handleSubmit, isLoading, goToPrevScreen};
};

export default useSignupScreen;

const styles = StyleSheet.create({});
// const { control, errors, onSubmit, handleSubmit, isLoading, goToPrevScreen } = useSignupScreen();
