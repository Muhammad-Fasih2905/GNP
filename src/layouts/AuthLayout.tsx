import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {hp, screen_width} from '../const';
import { AuthLayoutProps } from '../types/types';
import AppStyles from '../styles/AppStyles';
import { AppColors } from '../theme';
import { AppImages } from '../utils/AppImages';

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundImage = false,
  childContainerStyle,
  statusBarStyle = 'dark-content',
}) => {
  return (
    <>
      {backgroundImage ? (
        <ImageBackground
          style={{flex: 1, width: screen_width}}
          source={AppImages.getStarted}>
          <StatusBar translucent={true} backgroundColor="transparent" />
          <View style={[styles.childContainer, childContainerStyle]}>
            {children}
          </View>
        </ImageBackground>
      ) : (
        <View style={AppStyles.flex}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle={statusBarStyle || 'dark-content'}
          />
          <View
            style={[
              styles.childContainer,
              {backgroundColor: AppColors.white},
              childContainerStyle,
            ]}>
            {children}
          </View>
        </View>
      )}
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
    paddingHorizontal: hp(2),
    paddingTop: hp(6),
  },
});
