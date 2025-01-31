import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import {hp, wp} from '../../../const';
import AppLayout from '../../../layouts/AppLayout';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  addbillingAddress,
  addShippingAddress,
  fetchBillingNShippingAddress,
} from '../../../store/user/userAction';
import AppStyles from '../../../styles/AppStyles';
import {AppColors, AppFonts, AppRadius, fontSizes} from '../../../theme';
import GlobalIcon from '../../../utils/GlobalIcon';
import SearchItemsList from '../../../components/SearchItemsList';
import {email_regex} from '../../../utils/constants';
import {PersonalInfoDataTypes} from '../../../types/types';

const AddressesScreen = () => {
  const searchItemsCardActive = useAppSelector(
    state => state.productSlice.searchItemsCardActive,
  );
  const isScreenLoading = useAppSelector(
    state => state.commonSlice.isScreenLoading,
  );
  const BillnShipAddress = useAppSelector(
    state => state.userSlice.BillnShipAddress,
  );
  const searchedItems = useAppSelector(
    state => state.productSlice.searchedItems,
  );
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const userData = useAppSelector(state => state.userSlice.userData);
  const [isEditingShipping, setEditingShipping] = useState(false);
  const [isEditingBilling, setEditingBilling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset();
    if (!BillnShipAddress.billing_address) {
    }
    let bAddr = null;
    if (isEditingBilling) {
      bAddr = BillnShipAddress.billing_address;
    } else if (isEditingShipping) {
      bAddr = BillnShipAddress.shipping_address;
    } else {
      return;
    }
    setValue('first_name', bAddr.first_name);
    setValue('last_name', bAddr.last_name);
    setValue('company', bAddr.company);
    setValue('address_1', bAddr.address_1);
    setValue('address_2', bAddr.address_2);
    setValue('state', bAddr.state);
    setValue('city', bAddr.city);
    setValue('postcode', bAddr.postcode);
    setValue('country', bAddr.country);
    setValue('email', bAddr.email);
    setValue('phone', bAddr.phone);
  }, [BillnShipAddress, isEdit]);

  useEffect(() => {
    const getShippingNBillingAddress = async () => {
      try {
        if (userData.ID) {
          const response = await dispatch(
            fetchBillingNShippingAddress({user_id: userData.ID}),
          ).unwrap();
        }
      } catch (error) {
        console.log('getShippingNBillingAddress error:', error);
      }
    };

    getShippingNBillingAddress();
  }, []);

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInfoDataTypes>({
    defaultValues: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      email: '',
      phone: '',
      user_id: userData.ID,
    },
  });

  const onSubmit = async (data: PersonalInfoDataTypes) => {
    try {
      if (isEditingBilling) {
        const response = await dispatch(addbillingAddress(data)).unwrap();
      } else if (isEditingShipping) {
        const response = await dispatch(addShippingAddress(data)).unwrap();
      }
      setEdit(false);
      if (userData.ID) {
        await dispatch(fetchBillingNShippingAddress({user_id: userData.ID}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = async () => {
    setRefreshing(true);
    if (userData.ID) {
      await dispatch(fetchBillingNShippingAddress({user_id: userData.ID}));
    }
    setRefreshing(false);
  };

  const onEditPress = (type: string) => {
    if (type == 'bill') {
      reset();
      setEdit(true);
      setEditingBilling(true);
      setEditingShipping(false);
    } else if (type === 'ship') {
      reset();
      setEdit(true);
      setEditingBilling(false);
      setEditingShipping(true);
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

      <FlatList
        nestedScrollEnabled
        refreshing={refreshing}
        contentContainerStyle={{paddingBottom: hp(10)}}
        refreshControl={
          <RefreshControl onRefresh={refreshPage} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}
        data={[0]}
        renderItem={({item}) => {
          return (
            <>
              {isScreenLoading && !refreshing ? (
                <ActivityIndicator
                  style={{paddingTop: hp(30)}}
                  size={'large'}
                  color={AppColors.primary}
                />
              ) : (
                <>
                  {!isEdit && (
                    <View style={styles.container}>
                      {typeof BillnShipAddress?.billing_address !== 'object' &&
                      typeof BillnShipAddress?.shipping_address == 'object' ? (
                        <Text
                          style={[
                            AppStyles.bookstitleMed,
                            {paddingVertical: hp(30), textAlign: 'center'},
                          ]}>
                          No Addresses Found
                        </Text>
                      ) : (
                        <>
                          <Text
                            style={[
                              AppStyles.bookstitleMed,
                              {paddingVertical: hp(2)},
                            ]}>
                            Addresses
                          </Text>
                          <Text style={styles.description}>
                            The Following Addresses Will Be Used On The Checkout
                            Page By Default
                          </Text>
                          {/* 
                          {typeof BillnShipAddress?.billing_address ===
                            'object' && ( */}
                          <>
                            <Text
                              style={[
                                AppStyles.bookstitleMed,
                                {paddingVertical: hp(2)},
                              ]}>
                              BILLING ADDRESS
                            </Text>
                            <View style={[AppStyles.rowBetween]}>
                              <Text style={styles.description}>
                                {userData.username}
                              </Text>
                              <Text
                                onPress={() => onEditPress('bill')}
                                style={[styles.description, styles.editBtn]}>
                                {BillnShipAddress.billing_address
                                  ? 'Edit'
                                  : 'Add billing address'}
                              </Text>
                            </View>
                          </>
                          {/* // )} */}
                          {/* {typeof BillnShipAddress?.shipping_address ===
                            'object' && ( */}
                          <>
                            <Text
                              style={[
                                AppStyles.bookstitleMed,
                                {paddingVertical: hp(2)},
                              ]}>
                              SHIPPING ADDRESS
                            </Text>
                            <View style={[AppStyles.rowBetween]}>
                              <Text style={styles.description}>
                                {userData.username}
                              </Text>
                              <Text
                                onPress={() => onEditPress('ship')}
                                style={[styles.description, styles.editBtn]}>
                                {BillnShipAddress.shipping_address
                                  ? 'Edit'
                                  : 'Add Shipping address'}
                              </Text>
                            </View>
                          </>
                          {/* )} */}
                        </>
                      )}
                    </View>
                  )}

                  {isEdit && (isEditingBilling || isEditingShipping) && (
                    <>
                      <View style={styles.container}>
                        <View style={styles.headerContainer}>
                          <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setEdit(false)}>
                            <GlobalIcon
                              name={'arrowleft'}
                              library="AntDesign"
                              color={AppColors.black}
                              size={hp(2.5)}
                            />
                          </TouchableOpacity>
                          <Text style={styles.headerTitle}>Addresses</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                          }}>
                          <Controller
                            name="first_name"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: 'first name is required',
                              },
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                              <Input
                                stylesInput={styles.textColor}
                                labelStyles={{
                                  color: AppColors.gray800,
                                  fontFamily: AppFonts.medium,
                                }}
                                label="First Name*"
                                placeholder="Graydon"
                                styleInputC={{
                                  backgroundColor: AppColors.inputGray,
                                  width: hp(20),
                                }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                error={
                                  errors.first_name && errors.first_name.message
                                }
                              />
                            )}
                          />
                          <Controller
                            name="last_name"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: 'last name is required',
                              },
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                              <Input
                                stylesInput={styles.textColor}
                                labelStyles={{
                                  color: AppColors.gray800,
                                  fontFamily: AppFonts.medium,
                                }}
                                label="Last Name*"
                                placeholder="Graydon"
                                styleInputC={{
                                  backgroundColor: AppColors.inputGray,
                                  width: hp(20),
                                }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                error={
                                  errors.last_name && errors.last_name.message
                                }
                              />
                            )}
                          />
                        </View>

                        <Controller
                          name="country"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'country is required',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Country / Region*"
                              placeholder="United States (US)"
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.country && errors.country.message}
                            />
                          )}
                        />

                        <Controller
                          name="address_1"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'street address 1 is required',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Street Address 1*"
                              placeholder="House Number And Street Name"
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={
                                errors.address_1 && errors.address_1.message
                              }
                            />
                          )}
                        />

                        <Controller
                          name="address_2"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'street address 2 is required',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Street Address 2*"
                              placeholder="House Number And Street Name"
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={
                                errors.address_2 && errors.address_2.message
                              }
                            />
                          )}
                        />

                        <Controller
                          name="city"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'city is required',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Town / City*"
                              placeholder=" "
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.city && errors.city.message}
                            />
                          )}
                        />

                        <Controller
                          name="state"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'state is required',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="State*"
                              placeholder=" "
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.state && errors.state.message}
                            />
                          )}
                        />

                        <Controller
                          name="postcode"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'zip code is required',
                            },
                            minLength: {
                              value: 3,
                              message: 'minumum length should be 3',
                            },
                            maxLength: {
                              value: 10,
                              message: 'exceeded max length',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Zip Code*"
                              placeholder=" "
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.postcode && errors.postcode.message}
                            />
                          )}
                        />

                        <Controller
                          name="phone"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'phone number is required',
                            },
                            minLength: {
                              value: 9,
                              message: 'minumum length should be 9',
                            },
                            maxLength: {
                              value: 20,
                              message: 'exceeded max length',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Phone*"
                              placeholder=" "
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.phone && errors.phone.message}
                            />
                          )}
                        />

                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: {
                              value: true,
                              message: 'email is required',
                            },
                            pattern: {
                              value: email_regex,
                              message: 'Invalid email format',
                            },
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              stylesInput={styles.textColor}
                              labelStyles={{
                                color: AppColors.gray800,
                                fontFamily: AppFonts.medium,
                              }}
                              label="Email Address*"
                              placeholder=" "
                              styleInputC={{
                                backgroundColor: AppColors.inputGray,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              error={errors.email && errors.email.message}
                            />
                          )}
                        />

                        <Button
                          loading={isLoading}
                          onPress={handleSubmit(onSubmit)}
                          title="SAVE"
                          variant="primary"
                          style={{marginTop: hp(2)}}
                        />
                      </View>
                    </>
                  )}

                  {isEdit && isEditingShipping && <></>}
                </>
              )}
            </>
          );
        }}
      />
    </AppLayout>
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppColors.white,
  },
  secondaryText: {
    color: AppColors.secondary,
  },
  editBtn: {
    textDecorationLine: 'underline',
    color: AppColors.primaryLight,
  },
  container: {
    // paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  description: {
    color: AppColors.black,
    fontSize: fontSizes.xs,
    fontFamily: AppFonts.medium,
  },

  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.lightyellow,
    width: 40,
    height: 40,
    borderRadius: AppRadius.sm,

    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: hp(2),
  },
  iconButton: {
    padding: hp(1),
  },
  headerTitle: {
    fontSize: hp(2.7),
    left: hp(3),
    color: AppColors.black,
    fontFamily: AppFonts.medium,
  },
  textColor: {
    color: AppColors.black,
  },
});
