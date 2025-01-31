import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import {AppColors, AppFonts} from '../../../theme';
import AppLayout from '../../../layouts/AppLayout';
import {hp, wp} from '../../../const';
import AppStyles from '../../../styles/AppStyles';
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import {Controller, useForm} from 'react-hook-form';
import {pwd_regex} from '../../../utils/constants';
import {
  getMyAccountDetails,
  updateMyAccountDetails,
  updatePassword,
} from '../../../store/user/userAction';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import SearchItemsList from '../../../components/SearchItemsList';

export interface MyAccountDetailsTypes {
  first_name: string;
  last_name: string;
  email: string;
  new_password: string;
  display_name: string;
}

const AccountDetails = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const userData = useAppSelector(state => state.userSlice.userData);
  const searchedItems = useAppSelector(
    state => state.productSlice.searchedItems,
  );
  const searchItemsCardActive = useAppSelector(
    state => state.productSlice.searchItemsCardActive,
  );
  const [detailsFetching, setDetailsFetching] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<MyAccountDetailsTypes>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      new_password: '',
      display_name: '',
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
        setValue('new_password', '');
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
      const myAccountDetailsObj = {
        first_name: data.first_name,
        last_name: data.last_name,
        new_password: data.new_password,
        display_name: data.display_name,
      };
      const response = await dispatch(
        updateMyAccountDetails(myAccountDetailsObj),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <AppHeader
        headerTitle={
          <Text>
            My A<Text style={styles.secondaryText}>cco</Text>unt
          </Text>
        }
        isHome={false}
      />

      {searchItemsCardActive && (
        <SearchItemsList searchedItems={searchedItems} />
      )}

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {detailsFetching ? (
          <View
            style={[
              {flex: 1},
              AppStyles.alignJustifyCenter,
              {paddingVertical: hp(25)},
            ]}>
            <ActivityIndicator size={'large'} color={AppColors.primary} />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.headerTitle}>Account Details</Text>

            <Controller
              name="first_name"
              control={control}
              rules={{}}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  // editable={false}
                  stylesInput={styles.textColor}
                  labelStyles={styles.inputLabel}
                  label="First Name*"
                  placeholder="Graydon"
                  styleInputC={{backgroundColor: AppColors.inputGray}}
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
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  // editable={false}
                  stylesInput={styles.textColor}
                  labelStyles={styles.inputLabel}
                  label="Last Name*"
                  placeholder="User"
                  styleInputC={{backgroundColor: AppColors.inputGray}}
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
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  editable={false}
                  stylesInput={styles.textColor}
                  labelStyles={styles.inputLabel}
                  label="Email Address"
                  placeholder="abc@mail.com"
                  styleInputC={{backgroundColor: AppColors.inputGray}}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.email && errors.email.message}
                />
              )}
            />

            <Controller
              name="new_password"
              control={control}
              rules={{
                // required: { value: true, message: 'password is required' },
                minLength: {value: 8, message: 'minimum length should be 8'},
                pattern: {
                  value: pwd_regex,
                  message:
                    'password must contain at least 1 special character, 1 capital alphabet, 1 small alphabet and 1 number',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  stylesInput={[styles.textColor, {color: AppColors.black}]}
                  label="New Password (Leave blank to leave unchanged)"
                  placeholder="************"
                  secureTextEntry
                  labelStyles={styles.inputLabel}
                  styleInputC={{backgroundColor: AppColors.inputGray}}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.new_password && errors.new_password.message}
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              title="SAVE CHANGES"
              variant="primary"
              style={{marginVertical: hp(2)}}
            />
          </View>
        )}
      </ScrollView>
    </AppLayout>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppColors.white,
  },
  secondaryText: {
    color: AppColors.secondary,
  },
  container: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    fontSize: hp(2.7),
    paddingVertical: hp(3),
    color: AppColors.black,
    fontFamily: AppFonts.bold,
  },
  textColor: {
    color: AppColors.gray700,
  },
  inputLabel: {color: AppColors.gray800, fontFamily: AppFonts.medium},
});
