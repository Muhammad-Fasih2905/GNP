import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {loginUser, registerUser} from '../../../store/user/userAction';
import {setLoading, showMessage} from '../../../store/common/commonSlice';
import {saveRememberMe, setToken} from '../../../store/user/userSlice';
import {useState} from 'react';

interface LoginDataTypes {
  email: string;
  password: string;
}

const useLoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  // dispatch(setLoading(false))

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginDataTypes>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const goToPrevScreen = () => {
    navigation.goBack();
  };
  const goToForgotPwdScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSubmit = async (data: LoginDataTypes) => {
    console.log(data);
    // return;
    try {
      const res = await dispatch(loginUser({data, rememberMe})).unwrap();
      // dispatch(saveRememberMe(rememberMe))
      // if (res.status === "success") {
      //   // console.log('res');
      // } else {
      //   // dispatch(showMessage(res.message));
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
    goToForgotPwdScreen,
    rememberMe,
    setRememberMe,
  };
};

export default useLoginScreen;

const styles = StyleSheet.create({});

// const { control, errors, onSubmit, handleSubmit, isLoading, goToPrevScreen, goToForgotPwdScreen, rememberMe,
//     setRememberMe, } = useLoginScreen();
