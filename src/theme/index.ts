
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const AppColors = {
  // Primary colors
  primary: '#132884',
  primaryDark: '#0056B3',
  primaryLight: '#47A3FF',

  // Secondary colors
  secondary: '#FFC50D',
  secondaryDark: '#CC7A00',
  secondaryLight: '#FFAF40',

  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  inputGray: '#E8E8E8',
  gray100: '#F7FAFC',
  gray200: '#EDF2F7',
  gray300: '#E2E8F0',
  gray400: '#CBD5E0',
  gray500: '#A0AEC0',
  gray600: '#718096',
  gray700: '#4A5568',
  gray800: '#2D3748',
  gray900: '#1A202C',

  // Functional colors
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  lightyellow: '#FFEBAC',
  info: '#17A2B8',

  // Background colors
  background: '#F8F9FA',
  card: '#FFFFFF',

  // Text colors
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textTertiary: '#A0AEC0',
};

export const AppFonts = {
  light: 'Roboto-Light',
  regular: 'Poppins-Light',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const fontSizes = {
  s: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '1xl': 21,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const AppSpaces = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
};

export const AppShadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const height_width = {
  width,
  height,
};

export const AppRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};


export default {
  AppColors,
  AppFonts,
  fontSizes,
  AppSpaces,
  AppShadows,
  height_width,
  AppRadius,
};