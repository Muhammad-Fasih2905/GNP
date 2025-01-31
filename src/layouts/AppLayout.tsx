import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {hp} from '../const';
import AppStyles from '../styles/AppStyles';
import { AppLayoutProps } from '../types/types';
import { AppColors } from '../theme';

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  childContainerStyle,
}) => {
  return (
    <View style={AppStyles.flex}>
     
      <View
        style={[
          styles.childContainer,
          {backgroundColor: AppColors.white},
          childContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
  },
});
