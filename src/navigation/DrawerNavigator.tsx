import * as React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'; 
import BottomTabs from './BottomTabs';
import AppDrawer from '../components/app-drawer/app-drawer';
import { AppColors } from '../theme';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => { 

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
        headerTintColor: AppColors.white,
        headerStyle: {
          backgroundColor: AppColors.primary,
        },
        headerTitleStyle: {
          color: AppColors.black
        },
      }}  
      initialRouteName='Dashboard'
      drawerContent={props => <AppDrawer {...props} />}>
           <Drawer.Screen name="drawer" component={BottomTabs} /> 



    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLeft: {
 

  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
});

export default DrawerNavigator;