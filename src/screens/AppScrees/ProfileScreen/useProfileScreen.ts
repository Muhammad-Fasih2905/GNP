import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useForm} from 'react-hook-form';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {requestReadImagesPermission} from '../../../utils/functions';
import {saveProfileImage} from '../../../store/user/userSlice';
import {
  getMyAccountDetails,
  updateMyAccountDetails,
} from '../../../store/user/userAction';

export interface ProfileInfoTypes {
  first_name: string;
  last_name: string;
  email?: string;
  user_id: number | undefined;
  // phone_number: string;
}

const useProfileScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const isScreenLoading = useAppSelector(
    state => state.commonSlice.isScreenLoading,
  );
  const userData = useAppSelector(state => state.userSlice.userData);
  const profileImage = useAppSelector(state => state.userSlice.profileImage);

  const {
    control,
    handleSubmit,
    unregister,
    getValues,
    setValue,
    formState: {errors},
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
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets) {
        dispatch(saveProfileImage(result.assets[0].uri));
      } else if (result.didCancel) {
      } else if (result.errorMessage) {
        console.log('result.errorMessage', result.errorMessage);
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
        const response = await dispatch(
          getMyAccountDetails({user_id: userData.ID}),
        ).unwrap();
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
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // // myHeaders.append("Cookie", "wordpress_logged_in_209dce847c0bdf8a4a1d90edf4700759=severe%40yopmail.com%7C1734013055%7CRK1KXbkOWV72k6eXRjg3dRjLzg7JA9TVAB52Xq9MWSS%7C5f6a2589140881f045935a95f32f402a2b1265c0bf6dc3899d7e4f1c2f4b8f6c; wp_woocommerce_session_209dce847c0bdf8a4a1d90edf4700759=t_8496b56c5be91d34ca2643de92c13f%7C%7C1732881928%7C%7C1732878328%7C%7C7d7fffacb4efce6402e6016ab41b350c");

      // const raw = JSON.stringify({
      //   "first_name": "Severesss",
      //   "last_name": "Snapesss"
      // });

      // const requestOptions = {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: "follow"
      // };

      // fetch("https://graydonpnavarre.com/wp-json/app/v1/account-details/167", requestOptions)
      //   .then((response) => response.text())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.error(error));

      const response = await dispatch(
        updateMyAccountDetails(myAccountDetailsObj),
      ).unwrap();
      console.log(myAccountDetailsObj);
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
    userData,
    isScreenLoading,
    captureImage,
    profileImage,
  };
};

export default useProfileScreen;

const styles = StyleSheet.create({});
