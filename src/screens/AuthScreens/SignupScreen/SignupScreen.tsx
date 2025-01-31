import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import { hp } from '../../../const';
import { showMessage } from '../../../store/common/commonSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { registerUser } from '../../../store/user/userAction';
import { AppColors, AppFonts, AppRadius, fontSizes } from '../../../theme';
import { SignUpDataTypes } from '../../../types/types';
import { AppImages } from '../../../utils/AppImages';
import { email_regex, pwd_regex } from '../../../utils/constants';
import GlobalIcon from '../../../utils/GlobalIcon';

const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataTypes>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      username: ""
    },
  });

  const onSubmit = async (data: SignUpDataTypes) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      if (res.status === "success") {
        navigation.navigate('LoginScreen')
      } else {
        dispatch(showMessage(res.message));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(showMessage(error.message));
    }
  };


  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <View style={styles.imageContainer}>
          <Image source={AppImages.ch2} style={styles.characterImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <GlobalIcon name={'arrowleft'} library='AntDesign' color={AppColors.black} size={hp(2.5)} />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Controller
            name="username"
            control={control}
            rules={{
              required: { value: true, message: 'Username is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Username'
                placeholder="Enter your username"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.first_name && errors.first_name.message}
              />
            )}
          />
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: { value: true, message: 'First name is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='First name'
                placeholder="Enter your first name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.first_name && errors.first_name.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: { value: true, message: 'Last name is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Last name'
                placeholder="Enter your last name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.last_name && errors.last_name.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: email_regex,
                message: 'Invalid email format',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Email'
                placeholder="yourmail@.com"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email && errors.email.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: 'Password is required' },
              minLength: { value: 8, message: "minimum length should be 8" },
              pattern: {
                value: pwd_regex,
                message: 'password must contain at least 1 special character, 1 capital alphabet, 1 small alphabet and 1 number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Password'
                placeholder="************"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password && errors.password.message}
              />
            )}
          />
          <Button title="SIGNUP" disabled={isLoading} loading={isLoading} onPress={handleSubmit(onSubmit)} variant='primary' style={{ marginTop: hp(2) }} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary,
  },
  imageContainer: {
    // Keep default size
  },
  characterImage: {
    resizeMode: 'cover',
    height: hp(40),
    width: '100%'
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: AppColors.secondary,
    width: 40,
    height: 40,
    borderRadius: AppRadius.sm,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontFamily: AppFonts.bold,
    color: AppColors.white,
    marginBottom: hp(2),
  },
});

export default SignUpScreen;
