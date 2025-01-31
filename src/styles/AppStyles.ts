import {Platform, StyleSheet} from 'react-native';
import {hp, screen_height, screen_width, wp} from '../const';
import {AppColors, AppFonts, fontSizes} from '../theme';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(2),
  },
  bookstitle: {
    color: AppColors.black,
    fontSize: fontSizes['2xl'],
    fontFamily: AppFonts.bold,
  },
  bookstitleMed: {
    color: AppColors.black,
    fontSize: fontSizes.lg,
    fontFamily: AppFonts.bold,
  },
  bookstitleSmall: {
    color: AppColors.black,
    fontSize: fontSizes.xs,
    fontFamily: AppFonts.medium,
  },
  booksDes: {
    color: AppColors.black,
    fontSize: fontSizes['1xl'],
    fontFamily: AppFonts.medium,
  },
  bookImage: {
    width: '100%',
    height: hp(50),
    resizeMode: 'contain',
  },
  authTitle: {
    color: AppColors.white,
    fontSize: fontSizes['2xl'],
    fontFamily: AppFonts.bold,
  },
  authSubTitle: {
    color: AppColors.gray500,
    fontSize: fontSizes.md,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: AppFonts.regular,
  },
  title16px: {
    color: AppColors.black,
    fontSize: fontSizes.md,
    // fontFamily: AppFonts.regular,
    fontFamily: AppFonts.bold,
    bottom: -2,
    lineHeight: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
  },
  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default AppStyles;
