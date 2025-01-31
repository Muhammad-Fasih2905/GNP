import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import { hp } from '../../../const';
import { showMessage } from '../../../store/common/commonSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { forgotPassword } from '../../../store/user/userAction';
import { AppColors, AppFonts, AppRadius, fontSizes } from '../../../theme';
import { ResetPasswordDataTypes } from '../../../types/types';
import { AppImages } from '../../../utils/AppImages';
import GlobalIcon from '../../../utils/GlobalIcon';


const ForgotPassword: React.FC = () => {
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
      },
    });
  
    const onSubmit = async (data: ResetPasswordDataTypes) => {
      try {
        const res = await dispatch(forgotPassword(data)).unwrap();
        if(res){
          setPasswordResetStatus(true)
        }
      } catch (error: any) {
        console.log(error);
        dispatch(showMessage(error.message));
      }
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={AppImages.ch2} style={styles.characterImage} />
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <GlobalIcon name={'arrowleft'} library='AntDesign' color={AppColors.black} size={hp(2.5)} />
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Forgot Password?</Text>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: { value: true, message: 'Email is required' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label='Email'
                            placeholder="email"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.email && errors.email.message}

                        />
                    )}
                />
                {
                    passwordResetStatus &&
                    <Text style={styles.title2}>password reset email has been sent</Text>
                }



                {/* <Controller
                    name="new_password"
                    control={control}
                    rules={{
                        required: { value: true, message: 'Password is required' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label='New Password'
                            placeholder="************"
                            secureTextEntry
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.new_password && errors.new_password.message}
                        />
                    )}
                /> */}

                <Button disabled={isLoading} title="RESET" loading={isLoading} onPress={handleSubmit(onSubmit)} variant='primary' style={{ marginTop: hp(2) }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.primary,
    },
    imageContainer: {
        height: '40%',
        width: '100%',
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
    backButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: fontSizes['lg'],
        fontFamily: AppFonts.bold,
        color: AppColors.white,
        marginVertical: hp(2),
    },
    title2: {
        fontSize: fontSizes['md'],
        fontFamily: AppFonts.bold,
        color: AppColors.white,
        marginVertical: hp(2),
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        marginBottom: 15,
        color: '#fff',
    },



});

export default ForgotPassword;