import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveRememberMe, saveRoute, setToken } from '../../store/user/userSlice';
import { AppImages } from '../../utils/AppImages';
import GlobalIcon from '../../utils/GlobalIcon';
import { hp, StatusBarHeight } from '../../const';
import { AppColors, AppFonts, fontSizes } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../store/user/userAction';
import ReusableModal from '../appModal';
import Button from '../AppButton';

interface IProps { }

type SectionItemProps = {
  route: string;
  name: string;
};

const AppDrawer: React.FC<IProps> = ({ }) => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice.token);
  const userData = useAppSelector(state => state.userSlice.userData);
  const [selectedPage, setSelectedPage] = React.useState('dash_board');
  const [modal, setModal] = React.useState(false);
  const isLoading = useAppSelector(state => state.commonSlice.isLoading)

  const handleMenuItemPress = (page: string) => {
    setSelectedPage(page);
    dispatch(saveRoute(false));
  };

  const Logout = async () => {
    await dispatch(logout({ user_id: userData.ID }))
    setModal(false)
  }

  const isPageSelected = (page: string) => {
    return selectedPage === page ? styles.selectedMenuItem : null;
  };

  const SectionItem = ({ route, name }: SectionItemProps) => (
    <Pressable
      onPress={() => {
        handleMenuItemPress(route);
        navigation.navigate(route);
      }}>
      <Text style={[styles.text_title, isPageSelected(route)]}>{name}</Text>
    </Pressable>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.secondary, paddingTop: StatusBarHeight(), }}>

        <Pressable
          style={{
            marginTop: Platform.OS === 'ios' ? hp(5) : 0,
            backgroundColor: AppColors.primary,
            // padding: hp(1),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: hp(5),
            borderRadius: 8,
            width: hp(5),
            height: hp(5),
            alignSelf: 'flex-end'
          }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <GlobalIcon
            name="close"
            library="AntDesign"
            size={hp(2.5)}
            color={'#fff'}
          />
        </Pressable>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <GlobalIcon name={'user'} library='FontAwesome' size={hp(3)} color={AppColors.black} />
            <Text style={styles.headerTitle}>My Account</Text>
          </View>

        </View>

        <ScrollView
          style={styles.drawerContents}
          showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => navigation.navigate('OrdersScreen')}
            style={[styles.contentBox, { alignItems: 'center' }]}>
            <Text style={styles.text}>ORDERS</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('MySubsScreen')}
            style={[styles.contentBox, { alignItems: 'center' }]}>
            <Text style={styles.text}>MY SUBSCRIPTION</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('AddressesScreen')}
            style={[styles.contentBox, { alignItems: 'center' }]}>
            <Text style={styles.text}>ADDRESSES</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('PaymentMethood')}
            style={[styles.contentBox, { alignItems: 'center' }]}>
            <Text style={styles.text}>PAYMENT METHODS</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('AccountDetails')}
            style={[styles.contentBox, { alignItems: 'center' }]}>
            <Text style={styles.text}>ACCOUNT DETAILS</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setModal(true)
            }}
            style={styles.logoBox2}>
            <GlobalIcon name={'log-out'} library='Entypo' size={hp(3)} color={AppColors.black} />
            <Text style={styles.headerTitle}>Log Out</Text>
          </Pressable>


          <View style={styles.bottom} />
        </ScrollView>


        <ReusableModal visible={modal} onClose={() => { setModal(false) }}>
          <TouchableWithoutFeedback style={styles.modalBox}>
            <View style={styles.logoutContainer}>
              <View>
                <Text style={styles.textTitle}>Are you sure you want to log out?</Text>
              </View>
              <View style={styles.btnBox}>
                <Button title="CANCEL"
                  disabled={isLoading}
                  variant='primary'
                  style={styles.logoutBtn}
                  onPress={() => { setModal(false) }} />
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  title="LOG OUT"
                  variant='primary'
                  style={styles.logoutBtn}
                  textStyle={{ fontWeight: '500' }}
                  onPress={Logout} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ReusableModal>


      </SafeAreaView>





    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer:
  {
    height: hp(25),
    paddingTop: hp(6),
    borderRadius: 10,
    backgroundColor: AppColors.white
  },

  logoutBtn:
    { marginVertical: hp(1), marginBottom: 0, width: hp(15) },

  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? hp(3) : 0,

  },
  logoBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? hp(13) : hp(13),
    paddingHorizontal: 20,

  },
  header: {
    height: Platform.OS === 'ios' ? hp(13.5) : hp(9.5),
    marginTop: Platform.OS === 'ios' ? hp(-6.9) : hp(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: AppColors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: AppFonts.bold,
    color: AppColors.black,
    paddingLeft: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  drawerContents: {
    // marginHorizontal: hp(4),
    marginTop: hp(2),
  },
  contentBox: {
    flexDirection: 'row',
  },
  text: {
    paddingLeft: hp(2.5),
    paddingBottom: hp(4),
    fontFamily: AppFonts.regular,
    color: AppColors.black,
    fontSize: fontSizes.md
  },
  text_title: {
    textAlign: 'left',
    paddingLeft: Platform.OS === 'ios' ? hp(5.4) : hp(5.8),
    paddingVertical: hp(0.7),
    textTransform: 'capitalize',
    fontFamily: AppFonts.regular,
    color: AppColors.black,
  },
  underline: {
    marginVertical: hp(3),
    borderWidth: 0.2,
    borderColor: AppColors.gray600,
  },
  bottom: {
    marginBottom: hp(5),
  },
  selectedMenuItem: {
    color: AppColors.primary,
  },
  textTitle: {
    fontFamily: AppFonts.bold,
    color: AppColors.black,
    textTransform: 'capitalize',
    // fontWeight:'bold',
    fontSize: fontSizes.xl,
    textAlign: 'center'
  },

  // modalBox:{
  //   // height:hp(30), 
  //   // height:'40%', 
  //   // width: '90%', 
  //   backgroundColor:AppColors.white, 
  //   borderRadius:10,
  //   alignItems: 'center',
  //   justifyContent:'center',
  //   alignSelf:'center',
  //   paddingHorizontal:10,
  //   marginHorizontal:10,
  //   marginTop:'60%',
  //   padding:20
  // },
  // modalText: {
  //   fontSize: 18,
  //   color: '#333',
  //   textAlign: 'center',
  //   marginBottom: 20,
  // }, 
  // btnBox:{
  //   flexDirection:'row',
  //   justifyContent:'space-evenly',
  //   paddingVertical: hp(2),
  //   // marginVertical: hp(2),
  //   width: '100%', 
  // },


  modalBox: {

    backgroundColor: AppColors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    // marginTop:'60%',
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
    // marginVertical: hp(2),
    width: '100%',
  },
});

export default AppDrawer;
