import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import Button from '../../../components/AppButton';
import { hp, wp } from '../../../const';
import AppLayout from '../../../layouts/AppLayout';
import { fetchPaymentCardInfo } from '../../../store/card/cardAction';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AppColors, AppFonts, fontSizes } from '../../../theme';
import { AppImages } from '../../../utils/AppImages';
import { capitalizeFirstLetter } from '../../../utils/functions';
import GlobalIcon from '../../../utils/GlobalIcon';
import Input from '../../../components/AppInput';
import { addCardInfo } from '../../../store/user/userAction';
import SearchItemsList from '../../../components/SearchItemsList';
import { CardField, createPaymentMethod, useStripe } from '@stripe/stripe-react-native';

const PaymentMethodCard = ({ logo, cardType, lastFourDigits }: any) => (
  <View style={styles.cardContainer}>
    <Image source={logo} style={styles.cardLogo} />
    <View style={styles.cardDetails}>
      <Text style={styles.cardType}>{cardType}</Text>
      <Text style={styles.cardNumber}>**** **** **** {lastFourDigits}</Text>
    </View>
  </View>
);


export interface CardInfoDataTypes {
  user_id: number | undefined;
  card_number: string;
  card_type: string;
  expiry_year: string;
  expiry_month: string;
  cvc: string;
}
export interface NewCardDataTypes {
  number: string,
  expiry_date: string,
  cvc: string,
}

const PaymentMethood = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isAddCard, setAddCard] = useState(false);
  const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
  const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
  const userData = useAppSelector(state => state.userSlice.userData);
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const isScreenLoading = useAppSelector(
    state => state.commonSlice.isScreenLoading,
  );
  const paymentCardInfo = useAppSelector(
    state => state.cardSlice.paymentCardInfo,
  );
  const [cardLoading, setCardLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCardDataTypes>({
    defaultValues: {
      number: '',
      expiry_date: '',
      cvc: '',
    },
  });

  const onSubmit = async (data: NewCardDataTypes) => {

    setCardLoading(true)
    if (!userData?.ID) {
      return
    }
    const cardInfo = {
      user_id: userData.ID,
      cvc: data.cvc, //currently optional in the req body
      card_type: "Visa",
      card_number: data.number,
      expiry_year: '20' + data.expiry_date.split('/')[1],
      expiry_month: data.expiry_date.split('/')[0],
    };

    console.log(cardInfo)
    // return
    try {
      const response = await dispatch(addCardInfo(cardInfo)).unwrap()
      setCardLoading(false)
      setAddCard(false)
    } catch (error) {

    }
    finally {
      setCardLoading(false)
    }



  }
  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      // customerId: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
      paymentIntentClientSecret: 'sk_test_51P1FnnRwjBC1Iz3C9kdqgWQr9xzW2ifTkTRM1iGqJzlScivmTPOMiaFOs8BpgLyAZF3i4OKRFo2ygHeWPy6O9G0w003ySDAWC2',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    // if (!error) {
    //   setLoading(true);
    // }
  };
  const openPaymentSheet = async () => {
    const {paymentMethod, error} = await createPaymentMethod({
      paymentMethodType: 'Card',
    });
    console.log('====================================');
    console.log(paymentMethod);
    console.log('====================================');
    // const { error } = await presentPaymentSheet();
    console.log("error ===>", error)
    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    // } else {
    //   Alert.alert('Success', 'Your order is confirmed!');
    // }
  };
  useEffect(() => {
    (async () => {
      // setCardLoading(false)
      await dispatch(fetchPaymentCardInfo({ user_id: userData.ID }))
      initializePaymentSheet();
    })()
  }, []);

  const handleInputChange = (value: string) => {
    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Add a slash automatically after 2 digits
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    return value;
  };

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

      {/* <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      > */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[0]}
        renderItem={({ item }) => {
          return <>
            {!isAddCard &&
              isScreenLoading ?

              <ActivityIndicator style={{ paddingTop: hp(30) }} size={'large'} color={AppColors.primary} />
              :
              <View style={styles.container}>
                <Text style={styles.headerTitle}>Payment Methods</Text>


                <FlatList
                  ListEmptyComponent={
                    <Text style={styles.description}>
                      No Saved Methods Found. <GlobalIcon name="folder-open" library="FontAwesome" size={18} color={AppColors.black} />
                    </Text>
                  }
                  data={paymentCardInfo}
                  renderItem={({ item }) => {
                    return <PaymentMethodCard
                      logo={item?.method?.toLowerCase() === 'visa' ? AppImages.visa : AppImages.master}
                      cardType={capitalizeFirstLetter(item.method)}
                      lastFourDigits={item.last4}
                    />
                  }}
                />

                {/* <PaymentMethodCard
              logo={AppImages.visa}
              cardType="Visa"
              lastFourDigits="6767"
              />
              <PaymentMethodCard
              logo={AppImages.master}
              cardType="MasterCard"
              lastFourDigits="6767"
              /> */}

                <Button
                  // onPress={() => setAddCard(true)}
                  onPress={openPaymentSheet}
                  title="+ ADD NEW CARD"
                  variant='primary'
                  style={styles.addButton}
                />
              </View>
            }



            {isAddCard &&
              <View style={styles.container}>
                <Text style={styles.headerTitle}>Add New Card</Text>

                {/* <View style={styles.content}>
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Card information</Text>
                      <TouchableOpacity style={styles.scanButton}>
                        <Image
                          // source={require('./path-to-your-scan-icon.png')}
                          style={styles.scanIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.cardFieldContainer}>
                      <CardField
                        postalCodeEnabled={false}
                        placeholders={{
                          number: 'Card number',
                        }}
                        cardStyle={{
                          backgroundColor: '#FFFFFF',
                          textColor: '#000000',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#E0E0E0',
                          fontSize: 16,
                          placeholderColor: '#999999',
                        }}
                        style={styles.cardField}
                        onCardChange={(details) => setCardDetails(details)}
                      />
                    </View>

                    <View style={styles.cardDetailsRow}>
                      <View style={[styles.input, styles.expiryInput]}>
                        <Text style={styles.inputLabel}>MM / YY</Text>
                      </View>
                      <View style={[styles.input, styles.cvcInput]}>
                        <Text style={styles.inputLabel}>CVC</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Billing address</Text>
                    <TouchableOpacity style={styles.countrySelector}>
                      <Text>United States</Text>
                      <Text style={styles.chevron}>▼</Text>
                    </TouchableOpacity>
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}>ZIP</Text>
                    </View>
                  </View>
                </View> */}
                {/* <CardField
                  postalCodeEnabled={true}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#F5F5F5',
                    textColor: '#333333',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: AppColors.gray500,
                    fontSize: 16,
                    placeholderColor: AppColors.gray400,
                  }}
                  style={{
                    width: '100%',
                    height: 60,
                    marginVertical: 10,
                  }}
                  onCardChange={(cardDetails: any) => {
                    console.log("cardDetails ==>", cardDetails)
                    // if (cardDetails.complete) {
                    //     setValue2('number', `**** **** **** ${cardDetails.last4}`);
                    //     setValue2('expiry_date', `${cardDetails.expiryMonth || ''}/${cardDetails.expiryYear || ''}`);
                    //     setValue2('cvc', cardDetails.cvc || '');
                    //     setValue2('card_type', cardDetails.brand || '');
                    // }
                  }}
                /> */}
                {/* <Controller
                  name="number"
                  control={control}
                  rules={{
                    required: { value: true, message: 'card number is required' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      maxLength={16}
                      stylesInput={styles.textColor}
                      labelStyles={{ color: AppColors.gray800, fontFamily: AppFonts.medium }}
                      label='Card Number*'
                      placeholder="1234 5678 9012 3456"
                      styleInputC={{ backgroundColor: AppColors.white, }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.number && errors.number.message}
                    />

                  )}
                />


                <Controller
                  name="expiry_date"
                  control={control}
                  rules={{
                    required: { value: true, message: 'card expiry date is required' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      maxLength={5}
                      stylesInput={styles.textColor}
                      labelStyles={{ color: AppColors.gray800, fontFamily: AppFonts.medium }}
                      label='Expiry Date*'
                      placeholder="34 / 22"
                      styleInputC={{ backgroundColor: AppColors.white, }}
                      value={value}
                      onBlur={onBlur}
                      // onChange={}
                      onChangeText={(text) => onChange(handleInputChange(text))}
                      // onChangeText={handleInputChange(onChange)}
                      error={errors.expiry_date && errors.expiry_date.message}
                    />

                  )}
                />


                <Controller
                  name="cvc"
                  control={control}
                  rules={{
                    required: { value: true, message: 'cvc is required' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      maxLength={4}
                      stylesInput={styles.textColor}
                      labelStyles={{ color: AppColors.gray800, fontFamily: AppFonts.medium }}
                      label='Card Code (CVC)*'
                      placeholder="321"
                      styleInputC={{ backgroundColor: AppColors.white, }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.cvc && errors.cvc.message}
                    />

                  )}
                /> */}



                {/* <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Name On Card</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Eric Brown"
                    placeholderTextColor={AppColors.gray700}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Card Number</Text>
                  <View style={styles.cardNumberContainer}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="1234 5678 9012 3456"
                      placeholderTextColor={AppColors.gray700}
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      keyboardType="numeric"
                    />
                    <View style={styles.cardTypeIcon}>
                      <Text style={styles.cardTypeText}>VISA</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rowContainer}>
                  <View style={[styles.inputWrapper, styles.smallInputWrapper]}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="10 / 24"
                      placeholderTextColor={AppColors.gray700}
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputWrapper, styles.smallInputWrapper]}>
                    <Text style={styles.label}>CVC</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="321"
                      placeholderTextColor={AppColors.gray700}
                      value={cvc}
                      onChangeText={setCvc}
                      keyboardType="numeric"
                    />
                  </View>
                </View> */}

                <Button
                  loading={cardLoading}
                  onPress={handleSubmit(onSubmit)}
                  title="ADD CARD"
                  variant='primary'
                  style={styles.addButton}
                />
                <Button

                  onPress={() => setAddCard(false)}
                  title="CANCEL"
                  variant='primary'
                  style={styles.addButton}
                />
              </View >
            }




          </>

        }}
      />

      {/* </ScrollView> */}
    </AppLayout >
  );
}

export default PaymentMethood;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: AppColors.white,
  },
  secondaryText: {
    color: AppColors.secondary,
  },
  container: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    fontSize: hp(2.7),
    paddingTop: hp(3),
    color: AppColors.black,
    fontFamily: AppFonts.bold,
  },
  description: {
    color: AppColors.black,
    fontSize: fontSizes.sm,
    fontFamily: AppFonts.medium,
    paddingBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.inputGray,
    borderRadius: hp(1),
    paddingHorizontal: hp(2),
    marginBottom: hp(2),
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666666',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  scanText: {
    color: '#007AFF',
    fontSize: 14,
  },
  cardFieldContainer: {
    marginBottom: 12,
  },
  cardField: {
    height: 50,
    marginVertical: 8,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  expiryInput: {
    flex: 1,
    marginRight: 8,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 8,
  },
  inputLabel: {
    color: '#999999',
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  PaymentCardcontainer: {
    padding: 16,
    backgroundColor: AppColors.white,
  },
  // cardField: {
  //   width: '100%',
  //   height: 50,
  //   marginVertical: 8,
  // },
  cardLogo: {
    width: wp(18),
    height: hp(15),
    marginRight: wp(4),
    resizeMode: 'contain',
  },
  cardDetails: {
    flex: 1,
  },
  cardType: {
    color: AppColors.black,
    fontSize: fontSizes.sm,
    fontFamily: AppFonts.bold,
  },
  cardNumber: {
    color: AppColors.black,
    fontSize: fontSizes.sm,
    fontFamily: AppFonts.regular,
    marginTop: hp(0.5),
  },
  addButton: {
    marginVertical: hp(2),
    backgroundColor: AppColors.secondary,
  },

  inputWrapper: {
    backgroundColor: AppColors.inputGray,
    borderRadius: 8,
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
  },
  label: {
    fontSize: fontSizes.xs,
    color: AppColors.gray700,
    fontFamily: AppFonts.medium,
    marginBottom: hp(1),
  },
  // input: {
  //   fontSize: fontSizes.sm,
  //   fontFamily: AppFonts.regular,
  //   color: AppColors.black,
  // },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTypeIcon: {
    backgroundColor: AppColors.white,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 8,
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTypeText: {
    fontSize: fontSizes.sm,
    fontFamily: AppFonts.bold,
    color: AppColors.black,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInputWrapper: {
    width: '48%',
  },

  addButtonText: {
    fontSize: fontSizes.md,
    fontFamily: AppFonts.bold,
    color: AppColors.white,
  },
  textColor: {
    color: AppColors.black
  }
});
