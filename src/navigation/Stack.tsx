// AppStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../types/navigationTypes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StatusBar } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

// Import your screens
import HomeScreen from '../screens/AppScrees/HomeScreen/HomeScreen';
import Vanguards from '../screens/AppScrees/Vanguards';
import Webcomic from '../screens/AppScrees/Webcomic/Webcomic';
import AboutUsScreen from '../screens/AppScrees/AboutUsScreen';
import BooksScreen from '../screens/AppScrees/BooksScreen/BooksScreen';
import OrdersScreen from '../screens/AppScrees/OrdersScreen/OrdersScreen';
import MySubsScreen from '../screens/AppScrees/MySubsScreen';
import AddressesScreen from '../screens/AppScrees/AddressesScreen/AddressesScreen';
import PaymentMethood from '../screens/AppScrees/PaymentMethod/PaymentMethood';
import AccountDetails from '../screens/AppScrees/AccountDetails.ts/AccountDetails';

// Import your components
import CustomHeader from '../components/CustomHeader';
import { CustomDrawerContent } from './CustomDrawerContent';
import GlobalIcon from '../utils/GlobalIcon';
import { AppColors } from '../theme';
import GetStartedScreen from '../screens/AuthScreens/GetStartedScreen';
import WelcomeScreen from '../screens/AuthScreens/WelcomeScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/AuthScreens/SignupScreen/SignupScreen';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword/ForgotPassword';
import AppDrawer from '../components/app-drawer/app-drawer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import AppTab from '../components/app-tabs/app-tabs';
import { saveRoute } from '../store/user/userSlice';
import { hp } from '../const';
import Notifications from '../screens/AppScrees/Notifications';
import CartScreen from '../screens/AppScrees/CartScreen';
import CheckoutScreen from '../screens/AppScrees/CheckoutScreen/CheckoutScreen';
import BookTrending from '../screens/AppScrees/BookTrending';
import ProfileScreen from '../screens/AppScrees/ProfileScreen/ProfileScreen';
import OrderDetailsScreen from '../screens/AppScrees/OrderDetailsScreen';
// import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  // const routeName = useAppSelector(state => state.userSlice.route)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomeScreen'}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="MySubsScreen" component={MySubsScreen} />
      <Stack.Screen name="AddressesScreen" component={AddressesScreen} />
      <Stack.Screen name="PaymentMethood" component={PaymentMethood} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="BookTrending" component={BookTrending} />

    </Stack.Navigator>
  );
};


const BottomTabNavigator = () => {

  const dispatch = useAppDispatch();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        headerShown: false,
        keyboardHidesTabBar: true,
      })}
      tabBar={(props: any) => <AppTab {...props} />}
    >
      <Tab.Screen
        name="Webcomic"
        component={Webcomic}
        initialParams={{ icon_name: 'click', library: 'CustomIcon' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(saveRoute(true));
          },
        })}
      />

      <Tab.Screen
        name="Vanguards"
        component={Vanguards}
        initialParams={{ icon_name: 'book', library: 'CustomIcon' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(saveRoute(true));
          },
        })}
      />

      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ icon_name: 'home', library: 'AntDesign' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(saveRoute(true));
          },
        })}
      />
      <Tab.Screen
        name="About"
        component={AboutUsScreen}
        initialParams={{ icon_name: 'exclamationcircleo', library: 'AntDesign' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(saveRoute(true));
          },
        })}
      />
      <Tab.Screen
        name="BooksScreen"
        component={BooksScreen}
        initialParams={{ icon_name: 'book2', library: 'CustomIcon' }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            dispatch(saveRoute(true));
          },
        })}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          width: '80%',
          height: hp(85),
          borderTopRightRadius: hp(5),
          borderBottomRightRadius: hp(5),
          overflow: 'hidden',
        },
      }}
      drawerContent={props => <AppDrawer {...props} />}>
      <Drawer.Screen name="home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};



const AppStack = () => {
  return (

    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="BottomTabs">
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
    
      {/* <Stack.Screen name="SelectTemplate" component={SelectTemplate} options={{ gestureEnabled: false }} />
      <Stack.Screen name="time_add" component={TimeAdd} />
      <Stack.Screen name="project_score" component={ProjectScore} />
      <Stack.Screen name="project_add" component={ProjectAdd} />
      <Stack.Screen name="project_name" component={ProjectName} />
      <Stack.Screen name="project-add-task" component={ProjectAddTask} /> */}
    </Stack.Navigator>
  );
};


const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

    </Stack.Navigator>
  );
};

export { AppStack, AuthStack };
