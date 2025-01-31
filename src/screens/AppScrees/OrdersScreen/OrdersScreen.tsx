import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import { hp, wp } from '../../../const';
import AppLayout from '../../../layouts/AppLayout';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchAllOrders } from '../../../store/order/orderAction';
import { Order } from '../../../store/order/orderSlice';
import AppStyles from '../../../styles/AppStyles';
import { AppColors, AppFonts } from '../../../theme';
import { capitalizeFirstLetter } from '../../../utils/functions';
import SearchItemsList from '../../../components/SearchItemsList';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ orderNumber, date, status, payment, order_id }: any) => {

  const navigation = useNavigation();

  return (
    <View style={styles.orderDetails2}>
      <View style={styles.orderRow}>
        <Text style={styles.orderValue}>{orderNumber}</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.orderValue}>{date}</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.orderValue}>{status}</Text>
      </View>
      <View style={[styles.orderRow, { marginBottom: hp(3) }]}>
        <Text style={styles.orderValue}>{payment}</Text>
      </View>
      <View style={[AppStyles.rowCenter, { gap: hp(1) }]}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>PAY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetailsScreen', { order_id: order_id })} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>VIEW</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}



const OrdersScreen = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userSlice.userData);
  const allOrders = useAppSelector(state => state.productSlice.allOrders);
  console.log('allOrders: ', allOrders);
  const isScreenLoading = useAppSelector(state => state.commonSlice.isScreenLoading);
  const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
  const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      if (userData.ID) {
        await dispatch(
          fetchAllOrders({ user_id: userData.ID }),
        );
      }
    })();
  }, []);

  return (
    <AppLayout>
      <AppHeader headerTitle={
        <Text>
          My A<Text style={styles.secondaryText}>cco</Text>unt
        </Text>
      } isHome={false} />
      {
        searchItemsCardActive &&
        <SearchItemsList searchedItems={searchedItems} />
      }
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

        {isScreenLoading ?
          <ActivityIndicator style={{ paddingTop: hp(30) }} size={'large'} color={AppColors.primary} />
          :
          <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>

            <View style={styles.orderItem}>

              <FlatList
                ListEmptyComponent={
                  <Text style={[styles.emptyOrderTitle]}>
                    No Orders Found.
                  </Text>
                }
                ListHeaderComponent={
                  <View style={styles.orderDetails}>
                    <View style={styles.orderRow}>
                      <Text onPress={() => navigation.navigate('OrderDetailsScreen', { order_id: 24 })} style={styles.orderLabel}>Order</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.orderLabel}>Date</Text>
                    </View>
                    <View style={styles.orderRow}>
                      <Text style={styles.orderLabel}>Status</Text>
                    </View>
                    <View style={[styles.orderRow, { marginBottom: hp(3) }]}>
                      <Text style={styles.orderLabel}>Payment</Text>
                    </View>
                    <View style={[styles.orderRow, { paddingVertical: hp(1.5), marginBottom: 0 }]}>
                      <Text style={styles.orderLabel}>Actions</Text>
                    </View>
                  </View>
                }
                showsHorizontalScrollIndicator={false}
                horizontal
                data={allOrders}
                renderItem={({ item: order }: { item: Order }) => {
                  return <OrderItem
                    order_id={order.order_id}
                    orderNumber={`#${order?.order_id}`}
                    date={order?.date_created?.split(" ")[0]}
                    status={capitalizeFirstLetter(order?.status)}
                    payment={`$${order?.total} 1 item`}
                  />
                }}
              />
            </View>

          </View>

        }
      </ScrollView>
    </AppLayout>
  );
}

export default OrdersScreen;

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
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: AppColors.black,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: AppColors.lightyellow,
    borderRadius: 8,
    padding: wp(4),
    marginBottom: hp(2),
  },
  orderDetails: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 6,
    // paddingTop: wp(7),
    padding: wp(3),
    marginRight: wp(2),
  },
  orderDetails2: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-start',
    borderRadius: 6,
    padding: wp(3),
    marginRight: wp(2),
  },
  orderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(4),
  },
  orderLabel: {
    color: AppColors.black,
    fontFamily: AppFonts.bold,
    fontSize: wp(3.5),
    lineHeight: 24
  },
  emptyOrderTitle: {
    color: AppColors.black,
    fontFamily: AppFonts.bold,
    fontSize: wp(3.5),
    lineHeight: 24,
    paddingTop: hp(15),
    paddingLeft: hp(5)
  },
  orderValue: {
    lineHeight: 24,
    color: AppColors.black,
    fontFamily: AppFonts.medium,
    fontSize: wp(3.5),
  },
  viewButton: {
    backgroundColor: AppColors.secondary,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.5),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewButtonText: {
    color: AppColors.black,
    fontFamily: AppFonts.medium,
    fontSize: wp(3),
  },
});