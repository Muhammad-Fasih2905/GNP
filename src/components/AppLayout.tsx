import React from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import AppStyles from '../styles/AppStyles';
import { AppColors } from '../theme';
import { wp } from '../const';

interface ILayoutProps {
  statusBarColor?: string;
  backgroundColor?: string;
  paddingHorizontal?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({
  children,
  backgroundColor = AppColors.white,
  paddingHorizontal = wp(16),
  style = {},
}) => {
  const token = useAppSelector(state => state.userSlice.token);

  return (
    <>

      <SafeAreaView style={[
        AppStyles.flex,
        { backgroundColor, paddingHorizontal },
        style
      ]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default Layout;
