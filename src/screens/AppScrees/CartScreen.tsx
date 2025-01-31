import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import AppHeader from '../../components/app-header/app-header';
import { AppColors, AppFonts, fontSizes } from '../../theme';
import AppLayout from '../../layouts/AppLayout';
import { hp, wp } from '../../const';
import AppStyles from '../../styles/AppStyles';
import Button from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CartItemTypes } from '../../store/product/productSlice';
import { applyCouponCode, fetchCartItems, removeCartItem } from '../../store/product/productAction';
import Input from '../../components/AppInput';
import { Controller, useForm } from 'react-hook-form';
import SearchItemsList from '../../components/SearchItemsList';
import { fetchBillingNShippingAddress } from '../../store/user/userAction';

const CartScreen = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.productSlice.productCart)
  const userId = useAppSelector(state => state.userSlice.userData.ID)
  const isScreenLoading = useAppSelector(state => state.commonSlice.isScreenLoading)
   const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
    const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
  const [couponLoading, setCouponLoading] = useState(false)
  const [removingCartLoading, setRemovingCartLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
          if (userId) {
              dispatch(fetchBillingNShippingAddress({ user_id: userId }))
          }
      },[])
  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])

  const refreshPage = async () => {
    setRefreshing(true)
    await dispatch(fetchCartItems())
    setRefreshing(false)
  }

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coupon_code: '',
    },
  });

  const onSubmit = async (data: { coupon_code: string }) => {

    try {
      if (data.coupon_code === "") {
        return
      }
      setCouponLoading(true)
      // userId &&
      if(!userId){
        return
      }
      const response = await dispatch(applyCouponCode({ user_id: userId, coupon_code: data.coupon_code })).unwrap()

      if (!response) {
      }
      else {

      }
    } catch (error) {
      console.log("applyTheCoupon:", error)
      setError("coupon_code", { message: 'Invalid coupon code', type: 'custom' }, { shouldFocus: true })
    }
    finally {

      setCouponLoading(false)
    }
  }

  const removeFromCart = async (cart_item_key: string) => {
    try {
      setRemovingCartLoading(true)
      if (!userId) {
        return
      }
      const response = await dispatch(removeCartItem({ user_id: userId, cart_item_key: cart_item_key })).unwrap()
      dispatch(fetchCartItems())
    } catch (error: any) {
      console.log(error?.message)
    }
    finally {
      setRemovingCartLoading(false)
    }
  }


  const calculateTotalPrice = (arr: CartItemTypes[]) => {
    let sum = 0;
    arr?.forEach((item) => {
      if (item.subtotal && item.quantity) {
        sum += (item.subtotal * item.quantity)
      }
    })

    return sum;
  }

  return (
    <AppLayout>
      <AppHeader headerTitle={
        <Text>
          Ca<Text style={styles.secondaryText}>rt</Text>
        </Text>
      } isHome={false} />
   {
        searchItemsCardActive &&
        <SearchItemsList searchedItems={searchedItems} />
      }
      <FlatList
        nestedScrollEnabled
        refreshing={refreshing}
        refreshControl={<RefreshControl onRefresh={refreshPage} refreshing={refreshing} />}
        showsVerticalScrollIndicator={false}
        data={[0]}
        renderItem={({ item }) => {
          return (
            <>

              {
                isScreenLoading && !refreshing ?
                  <ActivityIndicator style={{ paddingTop: hp(30) }
                  } size={'large'} color={AppColors.primary} />
                  :

                  cartItems?.length === 0 ?

                    <View>
                      <Text style={[styles.emptyOrderTitle]}>
                        No Items Found In The Cart
                      </Text>
                    </View>
                    :

                    <View style={styles.container}>
                      <View style={styles.productSection}>

                        <View style={styles.headerRow}>
                          <Text style={styles.headerText}>Product</Text>
                          <View style={[AppStyles.rowBetween, { width: '37%', gap: hp(0) }]}>
                            <Text style={[styles.headerText, {}]}>Quantity</Text>
                            <Text style={[styles.headerText, {}]}>Subtotal</Text>
                          </View>
                        </View>

                        <FlatList
                          data={cartItems}
                          keyExtractor={(item) => item?.product_id?.toString() || Math.random().toString()}
                          renderItem={({ item }: { item: CartItemTypes }) => {
                            return <View style={[styles.productRow, {}]}>
                              <Image
                                resizeMode='contain'
                                // resizeMode='cover'
                                source={{ uri: item?.image || 'https://placeholder.com/150' }}
                                style={styles.productImage}
                              />
                              <View style={styles.productDetails}>
                                <Text style={[styles.productTitle]}>{item?.product_name}</Text>
                                <Text style={styles.productPrice}>{`$${item?.price}`}</Text>
                              </View>

                              <View style={{ borderWidth: 0, borderColor: 'green', width: '37%', gap: hp(1) }}>

                                <View style={[AppStyles.rowCenter, { borderWidth: 0, borderColor: 'red' }]}>
                                  <Text style={[styles.quantity, { borderWidth: 0, borderColor: 'orange', flex: 1 }]}>{item?.quantity}</Text>
                                  <Text style={[styles.subtotal, { borderWidth: 0, borderColor: 'orange', flex: 1 }]}>{`$${item?.price}`}</Text>
                                </View>

                                <View style={{ alignSelf: 'center' }}>
                                  <Button
                                    loading={removingCartLoading}
                                    title='remove'
                                    size='small'
                                    variant='outline'
                                    textStyle={{ color: AppColors.white }}
                                    onPress={() => removeFromCart(item.cart_item_key)}
                                    style={styles.removeCartBtn} />
                                </View>

                              </View>

                            </View>
                          }}
                        />

                        <View style={styles.couponSection}>
                          <Controller
                            name="coupon_code"
                            control={control}
                            rules={{

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Input
                                stylesInput={{ fontSize: fontSizes.md, color: AppColors.black }}
                                placeholder="Coupon CODE"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                containerStyle={{ width: '48%', borderWidth: 0, borderColor: AppColors.white }}
                                styleInputC={{ backgroundColor: AppColors.white, }}
                                // error={error && error}
                                error={errors.coupon_code && errors.coupon_code.message}

                              />
                            )}
                          />
                          <Button
                            loading={couponLoading}
                            title="APPLY COUPON"
                            onPress={handleSubmit(onSubmit)}
                            textStyle={{ color: AppColors.white }}
                            style={{ width: '48%', backgroundColor: 'transparent', borderWidth: 1, borderColor: AppColors.white }}
                          />
                        </View>

                      </View>

                      <Button
                      onPress={()=> navigation.navigate('HomeScreen')}
                        title="CONTINUE SHOPPING"
                        onPress={() => { }}
                        style={styles.continueShoppingButton}
                      />

                      <View style={styles.cartTotalsSection}>
                        <Text style={styles.cartTotalsTitle}>Cart Totals</Text>
                        <View style={styles.totalRow}>
                          <Text style={styles.totalLabel}>Subtotal</Text>
                          <Text style={styles.totalAmount}>{`$${calculateTotalPrice(cartItems)}`}</Text>
                        </View>
                        <View style={[styles.totalRow, styles.totalRowBorder]}>
                          <Text style={styles.totalLabel}>Total</Text>
                          <Text style={styles.totalAmount}>{`$${calculateTotalPrice(cartItems)}`}</Text>
                        </View>
                        <Button
                          title="PROCEED TO CHECKOUT"
                          onPress={() => navigation.navigate('CheckoutScreen')}
                          style={styles.checkoutButton}
                        />
                      </View>

                    </View>

              }
            </>
          )
        }
        }
      />

    </AppLayout >
  );
}

const styles = StyleSheet.create({
  secondaryText: {
    color: AppColors.secondary,
  },
  emptyOrderTitle: {
    color: AppColors.gray600,
    fontFamily: AppFonts.bold,
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: 24,
    paddingTop: hp(30),
    // paddingLeft: hp(5)
  },
  container: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(4),
  },
  scrollView: {
    backgroundColor: AppColors.gray600,
  },

  productSection: {
    backgroundColor: AppColors.gray600,
    marginBottom: hp(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.secondary,
    padding: wp(4),
  },
  headerText: {
    color: AppColors.black,
    fontFamily: AppFonts.medium,
    fontSize: hp(1.5)
  },
  productRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: wp(2),
    backgroundColor: AppColors.black,
  },
  productImage: {
    width: wp(18),
    height: wp(20),
    marginRight: wp(4),
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color: AppColors.white,
    fontSize: wp(3.5),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
    width: '100%'
  },
  productPrice: {
    color: AppColors.white,
    fontSize: wp(3.5),
  },
  quantity: {
    textAlign: 'center',
    color: AppColors.gray400,
    // marginRight: wp(10),
  },
  removeCartText: {
    textAlign: 'center',
    color: AppColors.gray400,
    fontSize: wp(3.5),
    fontFamily: AppFonts.regular
    // marginRight: wp(10),
  },
  removeCartBtn: {
    borderWidth: 1,
    borderColor: AppColors.white,
    padding: hp(0.7),
    paddingHorizontal: hp(2),
    borderRadius: 5,
    marginVertical: hp(0.7)
  },
  subtotal: {
    color: AppColors.gray400,
    textAlign: 'center'
  },
  couponSection: {
    flexDirection: 'row',
    padding: wp(4),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#1D1D1D'
  },
  couponInput: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderRadius: 4,
    paddingHorizontal: wp(2),
    marginRight: wp(2),
  },
  applyCouponButton: {
    backgroundColor: AppColors.black,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 4,
    justifyContent: 'center',
  },
  applyCouponText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
  continueShoppingButton: {
    backgroundColor: AppColors.secondary,
  },

  cartTotalsSection: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    paddingVertical: wp(4),
  },
  cartTotalsTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: AppColors.black
  },
  totalRow: {
    padding: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AppColors.gray400,
  },
  totalRowBorder: {
    borderWidth: 1,
    borderColor: AppColors.gray400,
  },
  totalLabel: {
    fontSize: wp(3.5),
    color: AppColors.black,
    fontFamily: AppFonts.medium
  },
  totalAmount: {
    fontSize: wp(3.5),
    color: AppColors.black,
    fontFamily: AppFonts.medium
  },
  checkoutButton: {
    backgroundColor: AppColors.secondary,
    marginTop: hp(2),
  },

});

export default CartScreen;