import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { hp, wp } from '../../../const';
import AppStyles from '../../../styles/AppStyles';
import { AppColors, AppFonts, AppRadius, fontSizes } from '../../../theme';
import GlobalIcon from '../../../utils/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../components/AppInput';
import Button from '../../../components/AppButton';
import useProfileScreen from './useProfileScreen';
import { AppImages } from '../../../utils/AppImages';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { requestReadImagesPermission } from '../../../utils/functions';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { saveProfileImage } from '../../../store/user/userSlice';
import { getMyAccountDetails, updateMyAccountDetails, updateProfilePic } from '../../../store/user/userAction';

export interface ProfileInfoTypes {
  first_name: string;
  last_name: string;
  email?: string;
  user_id: number | undefined
  // phone_number: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const { control, errors, handleSubmit, onSubmit, isLoading, userData, isScreenLoading, captureImage, profileImage } = useProfileScreen();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const isScreenLoading = useAppSelector(
    state => state.commonSlice.isScreenLoading,
  );
  const userData = useAppSelector(state => state.userSlice.userData);
  const profileImage = useAppSelector(state => state.userSlice.profileImage);


  const {
    control,
    watch,
    handleSubmit,
    unregister,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileInfoTypes>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      // phone_number: '',
    },
  });

  const captureImage = async () => {
    try {
      const permission = await requestReadImagesPermission();
      if (!permission) {
        return;
      }
      const result: ImagePickerResponse = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets) {
        console.log(result.assets[0].uri);
        const formData = new FormData();
        formData.append('profile_picture', {
          uri: result.assets[0].uri,
          name: 'image.jpg',
          type: 'image/jpg',
        });
        formData.append('user_id', userData.ID)
        dispatch(updateProfilePic(formData))
        // dispatch(saveProfileImage(result.assets[0].uri));
      }
      else if (result.didCancel) {
        console.log("cancelled selection")
      }
      else if (result.errorMessage) {
        console.log("result.errorMessage", result.errorMessage)
      }
      const formData = new FormData();
    } catch (error) {
      console.log('captureImage error:', error);
    }
  };

  useEffect(() => {
    const fetchMyAccountDetails = async () => {
      try {
        // setDetailsFetching(true);
        const response = await dispatch(getMyAccountDetails({ user_id: userData.ID })).unwrap();
        console.log('response: ', response);
        setValue('first_name', response.first_name || '');
        setValue('last_name', response.last_name || '');
        setValue('email', response.email || '');
        // console.log('response', response);
      } catch (error) {
        console.log(error);
      } finally {
        // setDetailsFetching(false);
      }
    };

    fetchMyAccountDetails();
  }, []);


  const onSubmit = async (data: ProfileInfoTypes) => {
    try {
      const myAccountDetailsObj = {
        first_name: data.first_name,
        last_name: data.last_name,
        // user_id: userData.ID,
      };

      console.log(myAccountDetailsObj);
      const response = await dispatch(updateMyAccountDetails(myAccountDetailsObj)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <GlobalIcon name={'arrowleft'} library='AntDesign' color={AppColors.black} size={hp(2.5)} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </SafeAreaView>

      {isScreenLoading ?
        <View style={[{ flex: 1 }, AppStyles.alignJustifyCenter, { paddingVertical: hp(25) }]}>
          <ActivityIndicator size={'large'} color={AppColors.primary} />
        </View>
        :
        <View style={styles.container2}>

          <View style={[styles.avatarContainer]}>

            <View style={{ position: 'relative' }}>
              <Image source={profileImage ? { uri: profileImage } : AppImages.avatar} resizeMode='cover' style={styles.avatarImg} />
              <TouchableOpacity onPress={captureImage} style={styles.round}>
                <GlobalIcon library='Ionicons' name="pencil-outline" size={15} color={AppColors.black} />
              </TouchableOpacity>
            </View>

            <View style={[{ gap: hp(1.5) }]}>
              <Text style={styles.usernameTextStyles}>{watch('first_name')}</Text>
              <Text style={styles.usernameEmailStyles}>{userData.email}</Text>
            </View>

          </View>

          <Controller
            name="first_name"
            control={control}
            rules={{
              required: { value: true, message: 'first name is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                stylesInput={styles.textColor}
                labelStyles={styles.labelTextStyles}
                label='First Name*'
                placeholder="first name"
                styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
              required: { value: true, message: 'last name is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                stylesInput={styles.textColor}
                labelStyles={styles.labelTextStyles}
                label='Last Name*'
                placeholder="last name"
                styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
              required: { value: true, message: 'email is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                editable={false}
                stylesInput={[styles.textColor, { color: AppColors.gray900 }]}
                labelStyles={styles.labelTextStyles}
                label='Email*'
                placeholder="email"
                styleInputC={{ backgroundColor: AppColors.inputGray, }}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email && errors.email.message}
              />
            )}
          />

          <Button loading={isLoading} onPress={handleSubmit(onSubmit)} title="Edit Details" variant='primary' style={{ marginTop: hp(2) }} />
        </View>

      }

    </View>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.white,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container2: {
    marginTop: hp(5),
    paddingHorizontal: wp(4),
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.secondary,
    width: 40,
    height: 40,
    borderRadius: AppRadius.sm,

    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(5),
    paddingVertical: hp(5),
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: hp(2),
    borderBottomRightRadius: hp(2),
  },
  iconButton: {
    padding: hp(1),
  },
  headerTitle: {
    fontSize: hp(2.7),
    left: hp(3),
    color: AppColors.black,
    fontFamily: AppFonts.regular,
  },
  labelTextStyles: {
    color: AppColors.black,
    fontFamily: AppFonts.medium
  },
  avatarImg: {
    width: hp(10),
    height: hp(10)
  },
  usernameTextStyles: {
    color: AppColors.black,
    fontSize: fontSizes.lg,
    fontFamily: AppFonts.bold,
  },
  usernameEmailStyles: {
    color: AppColors.gray700,
    fontSize: fontSizes.sm,
    fontFamily: AppFonts.regular,
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    padding: hp(0.5),
    backgroundColor: AppColors.secondary,
    position: 'absolute',
    right: 5,
    bottom: 5
  },
  avatarContainer:
    { flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%', marginBottom: hp(4), gap: hp(2) },
  textColor: {
    color: AppColors.black
  }
})