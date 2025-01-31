import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppHeader from '../../components/app-header/app-header';
import { AppColors, AppFonts } from '../../theme';
import AppLayout from '../../layouts/AppLayout';
import { hp, wp } from '../../const';
import AppStyles from '../../styles/AppStyles';
import Button from '../../components/AppButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cancelSubscription } from '../../store/order/orderAction';

const OrderItem = ({ orderNumber, date, status, payment }: any) => (
  <View style={styles.orderItem}>
    <View style={styles.orderDetails}>
      <View style={styles.orderRow}>
        <Text style={styles.orderLabel}>Order</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.orderLabel}>Date</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.orderLabel}>Status</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.orderLabel}>Payment</Text>
      </View>
    </View>
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
      <View style={styles.orderRow}>
        <Text style={styles.orderValue}>{payment}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.viewButton}>
      <Text style={styles.viewButtonText}>VIEW</Text>
    </TouchableOpacity>
  </View>
);

const MySubsScreen = () => {
  const userId = useAppSelector(state => state.userSlice.userData)
  const dispatch = useAppDispatch()
  return (
    <AppLayout>
      <AppHeader headerTitle={
        <Text>
          My A<Text style={styles.secondaryText}>cco</Text>unt
        </Text>
      } isHome={false} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Text style={styles.title}>My Subscription</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Status</Text>
            <Text style={styles.totalAmount}>On Hold</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Start Date</Text>
            <Text style={styles.totalAmount}>January 30, 2024</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Last Order Date</Text>
            <Text style={styles.totalAmount}>January 30, 2024</Text>
          </View>

          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Next Payment Date</Text>
            <Text style={styles.totalAmount}>-</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Payment</Text>
            <Text style={styles.totalAmount}>N/A</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder, { alignItems: 'center' }]}>
            <Text style={styles.totalLabel}>Actions</Text>
            <View style={[AppStyles.row, { justifyContent: 'flex-end' }]}>
              <Button variant='primary' title='CANCEL'
              //  onPress={() => dispatch(cancelSubscription(userId?.ID))} 
               style={{ width: '39%', marginRight: hp(1) }} />
              <Button variant='primary' title='Renew' style={{ width: '39%' }} />
            </View>

          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Subscription Total</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Product</Text>
            <Text style={styles.totalAmount}>Total</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={[styles.totalLabel, { fontSize: hp(1.5), color: AppColors.primaryLight }]}>Vanguards Of Silver & Gold x 1</Text>
            <Text style={styles.totalAmount}>January 30, 2024</Text>
          </View>
          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Subtotla:</Text>
            <Text style={styles.totalAmount}>$4.00</Text>
          </View>

          <View style={[styles.totalRow, styles.totalRowBorder]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>$4.00 / Month</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>My Orders</Text>
          <OrderItem
            orderNumber="#123"
            date="01/01/2024"
            status="Completed"
            payment="$4.00 1 item"
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

export default MySubsScreen;

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
    width: '70%',
    backgroundColor: AppColors.white,
    borderRadius: 6,
    padding: wp(3),
    marginRight: wp(2),
  },
  orderDetails2: {
    flex: 1,
    width: '70%',
    borderRadius: 6,
    padding: wp(3),
    marginRight: wp(2),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  orderLabel: {
    color: AppColors.black,
    fontFamily: AppFonts.bold,
    fontSize: wp(3.5),
  },
  orderValue: {
    color: AppColors.black,
    fontFamily: AppFonts.medium,
    fontSize: wp(3.5),
  },
  viewButton: {
    backgroundColor: AppColors.secondary,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
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
});