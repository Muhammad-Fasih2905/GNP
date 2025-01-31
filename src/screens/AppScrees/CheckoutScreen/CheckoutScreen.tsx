import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import { AppColors, AppFonts, fontSizes } from '../../../theme';
import AppLayout from '../../../layouts/AppLayout';
import { hp, wp } from '../../../const';
import AppStyles from '../../../styles/AppStyles';
import Button from '../../../components/AppButton';
import Input from '../../../components/AppInput';
import GlobalIcon from '../../../utils/GlobalIcon';
import { Controller, useForm } from 'react-hook-form';
import { email_regex } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addbillingAddress, addCardInfo, fetchBillingNShippingAddress } from '../../../store/user/userAction';
import SearchItemsList from '../../../components/SearchItemsList';
import { CartItemTypes } from '../../../store/product/productSlice';
import { placeOrder } from '../../../store/order/orderAction';
import ReusableModal from '../../../components/appModal';
import { useNavigation } from '@react-navigation/native';
import { PersonalInfoDataTypes, CardInputTypes } from '../../../types/types';
import DropDownPicker from 'react-native-dropdown-picker';
import { CardField, createPaymentMethod } from '@stripe/stripe-react-native';


const CheckoutScreen = () => {

    const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
    const isScreenLoading = useAppSelector(state => state.commonSlice.isScreenLoading)
    const BillnShipAddress = useAppSelector(state => state.userSlice.BillnShipAddress)
    const BillingAddress = useAppSelector(state => state.userSlice.BillnShipAddress)
    console.log("BillingAddress ===>", BillingAddress)
    const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
    const cartItem = useAppSelector(state => state.productSlice.productCart)
    const isLoading = useAppSelector(state => state.commonSlice.isLoading);
    const userData = useAppSelector(state => state.userSlice.userData);
    const [rememberMe, setRememberMe] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modal, setModal] = React.useState(false);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Visa', value: 'Visa' },
        { label: 'Master', value: 'Master' }
    ]);
    useEffect(() => {
        if (!BillnShipAddress.billing_address) {
            // setModal(true);
            console.log("BillnShipAddress not found")
        }
        const bAddr = BillnShipAddress.billing_address;
        setValue('first_name', bAddr.first_name)
        setValue('last_name', bAddr.last_name)
        setValue('company', bAddr.company)
        setValue('address_1', bAddr.address_1)
        setValue('address_2', bAddr.address_2)
        setValue('state', bAddr.state)
        setValue('postcode', bAddr.postcode)
        setValue('country', bAddr.country)
        setValue('city', bAddr.city)
        setValue('email', bAddr.email)
        setValue('phone', bAddr.phone)
    }, [])

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
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
            user_id: userData?.ID
        },
    });

    const onSubmitUpdateDetails = async (data: PersonalInfoDataTypes) => {
        dispatch(addbillingAddress(data))
    }

    const {
        control: control2,
        handleSubmit: handleSubmit2,
        setValue: setValue2,
        formState: { errors: errors2 },
    } = useForm<CardInputTypes>({
        defaultValues: {
            number: '',
            expiry_date: '',
            cvc: '',
            card_type: ''
        },
    });




    const onSubmit = async (data: CardInputTypes) => {
        console.log("cardData ===>", data)
        if (!userData.ID) {
            return
        }
        const cardInfo = {
            // user_id: 1,
            user_id: userData.ID,
            // cvc: data.cvc,
            card_number: data.number,
            expiry_year: '20' + data.expiry_date.split('/')[1],
            expiry_month: data.expiry_date.split('/')[0],
            // card_type: 'Visa' //add it dynamically
            card_type: data.card_type
        };

        console.log('cardInfo info', cardInfo);

        const products = cartItem.map((item: CartItemTypes, index: number) => {
            return { product_id: item.product_id, quantity: item.quantity }
        })


        try {
            const cardToken: { token: string } = await dispatch(addCardInfo(cardInfo)).unwrap()

            console.log("card token:", cardToken?.token)
            // return
            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: 'Card',
            });
            if (error) {
                // dispatch(setLoading(false));
                // Alert.alert('Error', error.message);
            } else if (paymentMethod) {
                console.log("payment_method_id ===>", paymentMethod.id,)
                const placeOrderObj = {
                    user_id: userData.ID,
                    products: products,
                    currency: "USD",
                    // token: cardToken,
                    billing: BillnShipAddress.billing_address,
                    // payment_method_id: paymentMethod.id,
                }
                const response = await dispatch(placeOrder(placeOrderObj)).unwrap()
                console.log("final res ==>", response)
            }

            // const placeOrderObj = {
            //     "user_id": 1,
            //     "token": cardToken,
            //     "currency": "USD",
            //     "products": products,
            //     "billing": {
            //         "first_name": "John",
            //         "last_name": "Doe",
            //         "address_1": "123 Main Street",
            //         "address_2": "Apartment 4B",
            //         "city": "New York",
            //         "state": "NY",
            //         "postcode": "10001",
            //         "country": "US",
            //         "email": "john.doe@example.com",
            //         "phone": "123-456-7890"
            //     }
            // }


        } catch (error: any) {
            console.log(error);
        }
    };

    const calculateTotalPrice = (arr: CartItemTypes[]) => {
        let sum = 0;
        arr?.forEach((item) => {
            if (item.subtotal && item.quantity) {
                sum += (item.subtotal * item.quantity)
            }
        })
        return sum;
    }

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const refreshPage = async () => {
        setRefreshing(true)
        if (userData.ID) {
            await dispatch(fetchBillingNShippingAddress({ user_id: userData.ID }))
        }
        setDropDownValue(null)
        setRefreshing(false)
    }

    const handleInputChange = (value: string) => {
        value = value.replace(/\D/g, "");
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }

        return value;
    };

    return (
        <AppLayout>
            <AppHeader headerTitle={
                <Text>
                    Che<Text style={styles.secondaryText}>cko</Text>ut
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


                                    <View style={styles.container}>

                                        <View style={styles.formSection}>
                                            <Text style={styles.cartTotalsTitle}>Personal Information</Text>

                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                                <Controller
                                                    name="first_name"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: 'first name is required' },
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Input
                                                            // editable={false}

                                                            stylesInput={styles.textColor}
                                                            labelStyles={styles.label}
                                                            label='First Name*'
                                                            placeholder="Graydon"
                                                            styleInputC={{ backgroundColor: AppColors.inputGray, width: hp(20) }}
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
                                                            // editable={false}


                                                            stylesInput={styles.textColor}
                                                            labelStyles={styles.label}
                                                            label='Last Name*'
                                                            placeholder="Graydon"
                                                            styleInputC={{ backgroundColor: AppColors.inputGray, width: hp(20) }}
                                                            value={value}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            error={errors.last_name && errors.last_name.message}
                                                        />
                                                    )}
                                                />
                                            </View>

                                            <Controller
                                                name="country"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: 'country is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}


                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Country / Region*'
                                                        placeholder="United States (US)"
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
                                                    required: { value: true, message: 'street address 1 is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}


                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Street Address 1*'
                                                        placeholder="House Number And Street Name"
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        error={errors.address_1 && errors.address_1.message}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="address_2"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: 'street address 2 is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}


                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Street Address 2*'
                                                        placeholder="House Number And Street Name"
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        error={errors.address_2 && errors.address_2.message}
                                                    />
                                                )}
                                            />



                                            <Controller
                                                name="city"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: 'city is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}


                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Town / City*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
                                                    required: { value: true, message: 'state is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='State*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
                                                    required: { value: true, message: 'zip code is required' },
                                                    minLength: { value: 3, message: "minumum length should be 3" },
                                                    maxLength: { value: 10, message: "exceeded max length" },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Zip Code*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
                                                    required: { value: true, message: 'phone number is required' },
                                                    minLength: { value: 9, message: "minumum length should be 9" },
                                                    maxLength: { value: 20, message: "exceeded max length" },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Phone*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
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
                                                    required: { value: true, message: 'email is required' },
                                                    pattern: {
                                                        value: email_regex,
                                                        message: 'Invalid email format',
                                                    },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        // editable={false}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Email Address*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.inputGray, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        error={errors.email && errors.email.message}
                                                    />
                                                )}
                                            />
                                            <Button
                                                title="Update Details"
                                                onPress={handleSubmit(onSubmitUpdateDetails)}
                                                style={styles.AddCardButton}
                                            />
                                        </View>

                                        <View style={styles.cartTotalsSection}>
                                            <Text style={styles.cartTotalsTitle}>Your Order</Text>
                                            <View style={styles.totalRow}>
                                                <Text style={styles.totalLabel}>Product</Text>
                                                <Text style={styles.totalAmount}>Subtotal</Text>
                                            </View>

                                            <FlatList
                                                data={cartItem}
                                                renderItem={({ item }) => {
                                                    return <View key={item.cart_item_key} style={styles.totalRow}>
                                                        <Text style={styles.totalLabel}>{`${item.product_name} × ${item.quantity}`}</Text>
                                                        <Text style={styles.totalAmount}>{`$${item.price}`}</Text>
                                                    </View>
                                                }}
                                            />

                                            <View style={[styles.totalRow, styles.totalRowBorder]}>
                                                <Text style={styles.totalLabel}>Subtotal</Text>
                                                {/* <Text style={styles.totalAmount}>{`$${cartItem.price}`}</Text> */}
                                            </View>
                                            <View style={[styles.totalRow, styles.totalRowBorder]}>
                                                <Text style={styles.totalLabel}>Total</Text>
                                                <Text style={styles.totalAmount}>{`$${calculateTotalPrice(cartItem)}`}</Text>
                                            </View>

                                        </View>

                                        {/* <CardField
                                            postalCodeEnabled={true}
                                            placeholders={{
                                                number: '4242 4242 4242 4242',
                                            }}
                                            cardStyle={{
                                                backgroundColor: '#FFFFFF',
                                                textColor: '#000000',
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: AppColors.gray500,
                                            }}
                                            style={{
                                                width: '100%',
                                                height: 50,
                                                marginVertical: 30,
                                            }}
                                            onCardChange={(cardDetails: any) => {
                                                console.log('card details ===>', cardDetails)
                                                if (cardDetails.complete) {
                                                    setValue2('number', `**** **** **** ${cardDetails.last4}`);
                                                    setValue2('expiry_date', `${cardDetails.expiryMonth || ''}/${cardDetails.expiryYear || ''}`);
                                                    setValue2('cvc', cardDetails.cvc || '');
                                                    setValue2('card_type', cardDetails.brand || '');
                                                    // setValue2('number', cardDetails.number || '');
                                                    // setValue2('expiry_date', `${cardDetails.expiryMonth || ''}/${cardDetails.expiryYear || ''}`);
                                                    // setValue2('cvc', cardDetails.cvc || '');
                                                    // setValue2('card_type', cardDetails.brand || '');
                                                }
                                            }}
                                        /> */}
                                        <Button
                                            icon={<GlobalIcon
                                                color={AppColors.primary}
                                                size={hp(2.5)}
                                                name={'plus'}
                                                library={'AntDesign'}
                                            />}
                                            title="Add Card"
                                            onPress={() => navigation.navigate('PaymentMethood')}
                                            style={styles.AddCardButton}
                                        />
                                        {/* <View style={styles.formSection2}>
                                            <Text style={[AppStyles.bookstitle,
                                            { paddingTop: hp(2) }]}>Credit Card (Stripe)</Text>
                                            <Text style={[AppStyles.booksDes,
                                            { fontSize: hp(2), color: AppColors.gray700, paddingBottom: hp(2) }]}>Pay With Your Credit Card Via Stripe</Text>


                                            <Controller
                                                name="number"
                                                control={control2}
                                                rules={{
                                                    required: { value: true, message: 'card number is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        maxLength={16}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Card Number*'
                                                        placeholder=""
                                                        styleInputC={{ backgroundColor: AppColors.white, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        error={errors2.number && errors2.number.message}
                                                    />

                                                )}
                                            />


                                            <Controller
                                                name="expiry_date"
                                                control={control2}
                                                rules={{
                                                    required: { value: true, message: 'card expiry date is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        maxLength={5}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Expiry Date*'
                                                        placeholder=""
                                                        styleInputC={{ backgroundColor: AppColors.white, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        // onChange={}
                                                        onChangeText={(text) => onChange(handleInputChange(text))}
                                                        error={errors2.expiry_date && errors2.expiry_date.message}
                                                    />

                                                )}
                                            />


                                            <Controller
                                                name="cvc"
                                                control={control2}
                                                rules={{
                                                    required: { value: true, message: 'cvc is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input
                                                        maxLength={4}
                                                        stylesInput={styles.textColor}
                                                        labelStyles={styles.label}
                                                        label='Card Code (CVC)*'
                                                        placeholder=" "
                                                        styleInputC={{ backgroundColor: AppColors.white, }}
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        error={errors2.cvc && errors2.cvc.message}
                                                    />

                                                )}
                                            />
                                            <Controller
                                                name="card_type"
                                                control={control2}
                                                rules={{
                                                    required: { value: true, message: 'card type is required' },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <View style={{ marginBottom: hp(2) }}>
                                                        <Text style={[styles.dropDownLabel,]}>{'Choose Card type*'}</Text>
                                                        <DropDownPicker
                                                            style={[{
                                                                height: 'auto',
                                                                borderRadius: 5,
                                                                borderWidth: 1,
                                                                borderColor: AppColors.gray500

                                                            }]}
                                                            open={open}
                                                            // textStyle={styles.dropDownLabel}
                                                            labelStyle={{ fontFamily: AppFonts.regular }}
                                                            value={dropDownValue}
                                                            items={items}
                                                            setOpen={setOpen}
                                                            onChangeValue={(t) => onChange(t)}
                                                            setValue={setDropDownValue}
                                                            setItems={setItems}
                                                            placeholder={'Select card type'}
                                                            multiple={false}
                                                        />
                                                        {errors2.card_type && <Text style={styles.errorText}>{errors2.card_type.message}</Text>}
                                                    </View>
                                                )}
                                            />



                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <TouchableOpacity onPress={toggleRememberMe} style={styles.checkboxContainer}>
                                                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                                        {rememberMe && (
                                                            <GlobalIcon
                                                                name="checkmark"
                                                                library='Ionicons'
                                                                size={16}
                                                                color={AppColors.white}  // White checkmark
                                                            />
                                                        )}
                                                    </View>
                                                </TouchableOpacity>
                                                <Text style={[AppStyles.booksDes, { fontSize: hp(2), color: AppColors.gray700, paddingBottom: hp(2), textAlign: 'center' }]}>
                                                    Save Payment Information For Future Payments
                                                </Text>
                                            </View>


                                        </View> */}

                                        <Button
                                            loading={isLoading}
                                            title="PLACE ORDER"
                                            disabled={isLoading}
                                            onPress={handleSubmit2(onSubmit)}
                                            style={styles.checkoutButton}
                                        />

                                    </View>


                            }
                        </>
                    )
                }
                }
            />


            <ReusableModal visible={modal} onClose={() => setModal(false)}>
                <TouchableWithoutFeedback style={styles.modalBox}>
                    <View style={styles.logoutContainer}>
                        <View>
                            <Text style={styles.textTitle}>Please add billing address in your account before proceeding further!</Text>
                        </View>
                        <View style={styles.btnBox}>
                            <Button title="OK"
                                variant='primary'
                                style={[styles.logoutBtn, {}]}
                                onPress={() => { navigation.goBack(); setModal(false) }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ReusableModal>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    dropDownLabel: {
        color: AppColors.gray800,
        fontFamily: AppFonts.medium,
        fontSize: fontSizes.xs,
        marginBottom: 8
        // color: AppColors.black,
        // fontFamily: AppFonts.regular

    },
    textTitle: {
        fontFamily: AppFonts.bold,
        color: AppColors.black,
        textTransform: 'capitalize',
        fontSize: fontSizes.xl,
        textAlign: 'center'
    },
    errorText: {
        color: AppColors.error,
        fontSize: fontSizes.xs,
        marginTop: 4,
    },
    label:
    {
        color: AppColors.gray800, fontFamily: AppFonts.medium

    },
    logoutContainer:
    {
        height: hp(28),
        paddingTop: hp(6),
        borderRadius: 10,
        backgroundColor: AppColors.white
    },

    logoutBtn:
        { marginVertical: hp(1), marginBottom: 0, width: hp(15) },
    secondaryText: {
        color: AppColors.secondary,
    },
    modalBox: {

        backgroundColor: AppColors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        padding: 20
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: hp(2),
        width: '100%',
    },
    container: {
        paddingVertical: hp(5),
        paddingHorizontal: wp(4),
    },
    scrollView: {
        backgroundColor: AppColors.gray600,
    },

    formSection: {
        backgroundColor: AppColors.white,
        borderRadius: 8,
    },

    formSection2: {
        backgroundColor: AppColors.inputGray,
        borderRadius: 8,
        paddingVertical: wp(2),
        paddingHorizontal: wp(4),
    },

    checkboxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
    AddCardButton: {
        backgroundColor: AppColors.secondary,
        marginTop: hp(2),
        gap: 8,
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: AppColors.secondary,
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: AppColors.secondary,
        borderColor: AppColors.secondary,
    },
    rememberMeText: {
        color: '#fff',
    },
    textColor: {
        color: AppColors.black
    }

});

export default CheckoutScreen;