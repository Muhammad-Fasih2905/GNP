import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from '../../../store/common/commonSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  forgotPassword,
  registerUser,
  resetPassword,
} from '../../../store/user/userAction';
import {setToken} from '../../../store/user/userSlice';
import {useState} from 'react';

interface ResetPasswordDataTypes {
  email: string;
  //   new_password: string;
}

const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const navigation = useNavigation();
  const [passwordResetStatus, setPasswordResetStatus] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      //   new_password: '',
    },
  });

  const goToPrevScreen = () => {
    navigation.goBack();
  };

  const onSubmit = async (data: ResetPasswordDataTypes) => {
    // return;
    try {
      const res = await dispatch(forgotPassword(data)).unwrap();

      if (res) {
        setPasswordResetStatus(true);
        // navigation.navigate('LoginScreen')
      }
      // if (res.success) {
      //   console.log('res');
      //   dispatch(setToken(1));
      // } else {
      //   dispatch(showMessage(res.message));
      // }
    } catch (error: any) {
      console.log(error);
      dispatch(showMessage(error.message));
    }
  };

  return {
    control,
    errors,
    onSubmit,
    handleSubmit,
    isLoading,
    goToPrevScreen,
    passwordResetStatus,
  };
};

export default useForgotPassword;

const styles = StyleSheet.create({});

// const { control, errors, onSubmit, handleSubmit, isLoading, goToPrevScreen, passwordResetStatus } = useForgotPassword();
