import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import {hp} from '../../../const';
import {showMessage} from '../../../store/common/commonSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {loginUser} from '../../../store/user/userAction';
import {AppColors, AppRadius, fontSizes} from '../../../theme';
import {LoginDataTypes} from '../../../types/types';
import {AppImages} from '../../../utils/AppImages';
import GlobalIcon from '../../../utils/GlobalIcon';
import {saveLoginCredentials} from '../../../store/user/userSlice';

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const navigation = useNavigation();
  const loginCredentials = useAppSelector(
    state => state.userSlice.loginCredentials,
  );
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginDataTypes>({
    defaultValues: {
      email: loginCredentials?.email || '',
      password: loginCredentials?.password || '',
    },
  });

  const onSubmit = async (data: LoginDataTypes) => {
    try {
      dispatch(loginUser({data, rememberMe})).unwrap();
      if (rememberMe) {
        dispatch(
          saveLoginCredentials({
            email: data.email,
            password: data.password,
          }),
        );
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
        extraScrollHeight={hp(10)}>
        <View style={styles.imageContainer}>
          <Image source={AppImages.ch1} style={styles.characterImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <GlobalIcon
              name={'arrowleft'}
              library="AntDesign"
              color={AppColors.black}
              size={hp(2.5)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>

          <Controller
            name="email"
            control={control}
            rules={{
              required: {value: true, message: 'Email is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Email Or Name"
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
              required: {value: true, message: 'Password is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label="Password"
                placeholder="************"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password && errors.password.message}
              />
            )}
          />

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}>
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && (
                  <GlobalIcon
                    name="checkmark"
                    library="Ionicons"
                    size={16}
                    color={AppColors.black}
                  />
                )}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <Button
            disabled={isLoading}
            loading={isLoading}
            title="LOGIN"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
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
    // height: '100%',
    // width: '100%',
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: AppColors.secondary,
    borderColor: AppColors.secondary,
  },
  rememberMeText: {
    color: '#fff',
  },
  forgotPassword: {
    color: AppColors.secondary,
  },
});

export default LoginScreen;
