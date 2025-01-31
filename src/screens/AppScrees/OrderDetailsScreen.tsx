import React, { useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import AppHeader from "../../components/app-header/app-header";
import SearchItemsList from "../../components/SearchItemsList";
import { hp, wp } from "../../const";
import AppLayout from "../../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Order } from "../../store/order/orderSlice";
import { AppColors, AppFonts } from "../../theme";
import { capitalizeFirstLetter } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { fetchOrderDetails } from "../../store/order/orderAction";

export interface lineItemsTypes {
    product_id: number,
    name: string,
    quantity: number,
    subtotal: string,
    total: string,
    sku: string,
    price: string
}

const orderDetails = {
    "order_id": 2758,
    "status": "processing",
    "total": "8.00",
    "date_created": "2024-12-18 20:27:47",
    "billing": {
        "first_name": "John",
        "last_name": "Doe",
        "address_1": "123 Main Street",
        "address_2": "Apartment 4B",
        "city": "New York",
        "state": "NY",
        "postcode": "10001",
        "country": "US",
        "email": "john.doe@example.com",
        "phone": "123-456-7890"
    },
    "shipping": {
        "first_name": "",
        "last_name": "",
        "address_1": "",
        "address_2": "",
        "city": "",
        "state": "",
        "postcode": "",
        "country": ""
    },
    "line_items": [
        {
            "product_id": 306,
            "name": "Vanguards of Silver and Gold.",
            "quantity": 2,
            "subtotal": "8",
            "total": "8",
            "sku": "",
            "price": "4"
        }
    ],
    "total_items": 1,
    "total_quantity": 2
}

// const line_items = [
//     {
//         "product_id": 306,
//         "name": "Vanguards of Silver and Gold.",
//         "quantity": 2,
//         "subtotal": "8",
//         "total": "8",
//         "sku": "",
//         "price": "4"
//     }
// ]

const EachItem: React.FC<{ item: lineItemsTypes }> = ({ item }) => {
    return <>
        <View style={styles.orderDetails2}>
            <View style={styles.orderRow2}>
                <Text style={styles.orderLabel2}>Product Id</Text>
                <Text style={styles.orderValue2}>{item.product_id}</Text>
            </View>
            <View style={styles.orderRow2}>
                <Text style={styles.orderLabel2}>Product name</Text>
                <Text style={styles.orderValue2}>{item.name}</Text>
            </View>
            <View style={styles.orderRow2}>
                <Text style={styles.orderLabel2}>Quantity</Text>
                <Text style={styles.orderValue2}>{item.quantity}</Text>
            </View>
            <View style={[styles.orderRow2]}>
                <Text style={styles.orderLabel2}>Price</Text>
                <Text style={styles.orderValue2}>{item.price}</Text>
            </View>
            <View style={[styles.orderRow2]}>
                <Text style={styles.orderLabel2}>Total</Text>
                <Text style={styles.orderValue2}>{item.total}</Text>
            </View>
        </View>
    </>
}

const OrderDetailsComponent = ({ orderNumber, date, status, payment }: any) => (
    <View style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={styles.orderDetails}>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Order Id</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Date</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Status</Text>
                </View>
                <View style={[styles.orderRow]}>
                    <Text style={styles.orderLabel}>Payment</Text>
                </View>
                <View style={[styles.orderRow]}>
                    <Text style={styles.orderLabel}>Items:</Text>
                </View>
            </View>

            <View style={styles.orderDetails}>
                <View style={styles.orderRow}>
                    <Text style={styles.orderValue}>{orderNumber}</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderValue}>{date}</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderValue}>{status}</Text>
                </View>
                <View style={[styles.orderRow]}>
                    <Text style={styles.orderValue}>{payment}</Text>
                </View>
            </View>

        </View>

        <FlatList
            data={orderDetails?.line_items}
            renderItem={({ item: order }: { item: lineItemsTypes }) => {
                return <EachItem
                    item={order}
                />
            }}
        />


    </View>
);

const OrderDetailsScreen = ({ route }: any) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.userSlice.userData);
    const isScreenLoading = useAppSelector(state => state.commonSlice.isScreenLoading);
    const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
    const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
    // const orderDetails = useAppSelector(state => state.orderSlice.orderDetails)


    useEffect(() => {
        (async () => {
            if (userData.ID) {
                await dispatch(
                    fetchOrderDetails({ user_id: userData.ID, order_id: route?.params?.order_id }),
                );
            }
        })();
    }, [route]);

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
                        <Text style={styles.title}>Order Details</Text>
                        <OrderDetailsComponent
                            orderNumber={`#${orderDetails?.order_id}`}
                            date={orderDetails?.date_created?.split(" ")[0]}
                            status={capitalizeFirstLetter(orderDetails?.status)}
                            payment={`$${orderDetails?.total} 1 item`}
                        />
                    </View>

                }
            </ScrollView>
        </AppLayout>
    );
}

export default OrderDetailsScreen;

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
        textAlign: 'center'
    },

    orderDetails: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: AppColors.white,
        borderRadius: 6,
        padding: wp(3),
        marginRight: wp(2),
    },
    orderDetails2: {
        width: '95%',
        alignItems: 'flex-start',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginBottom: hp(2),
        padding: wp(2),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: AppColors.gray500
    },

    orderRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    orderRow2: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
        height: 'auto'
    },
    orderLabel: {
        color: AppColors.black,
        fontFamily: AppFonts.bold,
        fontSize: wp(3.5),
        lineHeight: 24
    },
    orderLabel2: {
        width: '40%',
        color: AppColors.black,
        fontFamily: AppFonts.medium,
        fontSize: wp(3.5),
        lineHeight: 24
    },
    orderValue: {
        lineHeight: 24,
        color: AppColors.black,
        fontFamily: AppFonts.medium,
        fontSize: wp(3.5),
    },
    orderValue2: {
        lineHeight: 24,
        color: AppColors.black,
        fontFamily: AppFonts.medium,
        fontSize: wp(3.5),
        flexWrap: 'wrap',
        width: '55%',
    },
});