import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {AppStack, AuthStack} from './Stack';
import {Platform, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hydrateAuth} from '../store/user/userSlice';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const checkStoredLoginState = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const rememberMeStored = await AsyncStorage.getItem('rememberMe');

      if (token && rememberMeStored === 'true') {
        dispatch(
          hydrateAuth({
            token,
            rememberMe: true,
          }),
        );
      } else {
        dispatch(
          hydrateAuth({
            token: null,
            rememberMe: false,
          }),
        );
      }
    } catch (error) {
      console.error('Error checking stored login state:', error);
    }
  };

  const token = useAppSelector(state => state.userSlice.token);

  useEffect(() => {
    // checkStoredLoginState();
    if (Platform.OS === 'android') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  }, []);

  return (
    <NavigationContainer>
      <>
        {token ? (
          <React.Fragment>
            <StatusBar
              translucent
              barStyle={'light-content'}
              backgroundColor={'transparent'}
            />
            <AppStack />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StatusBar
              translucent
              barStyle={'light-content'}
              backgroundColor={'transparent'}
            />
            <AuthStack />
          </React.Fragment>
        )}
      </>
    </NavigationContainer>
  );
};
export default Navigation;
