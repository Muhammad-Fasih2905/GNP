import { topTrendingBooksTypes } from "../store/product/productSlice";

export type RootStackParamList = {


  // auth screens 
  GetStartedScreen: undefined;
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPassword: undefined;





  // App Screen
  BottomTabs: undefined;
  Vanguards: undefined;
  Webcomic: undefined;
  HomeScreen: undefined;
  AboutUsScreen: undefined;
  BooksScreen: undefined;
  Notifications: undefined;
  ProfileScreen: undefined;
  CartScreen: undefined;
  CheckoutScreen: undefined;
  BookTrending: undefined | {book: topTrendingBooksTypes | any, active?: number};
  OrderDetailsScreen: undefined |  {order_id: number}
  
  // drawer
  
  MainDrawer: undefined;
  MyAccountScreen: undefined;
  OrdersScreen: undefined;
  MySubsScreen: undefined;
  AddressesScreen: undefined;
  PaymentMethood: undefined;
  AccountDetails: undefined;



};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
  
}

