import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Platform,
  TextInput,
  ImageBackground,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GlobalIcon from '../../utils/GlobalIcon';
import {AppColors, AppFonts} from '../../theme';
import {hp, StatusBarHeight} from '../../const';
import {AppImages} from '../../utils/AppImages';
import SearchContainer from '../SearchContainer';

interface IProps {
  headerTitle?: any;
  showBackIcon?: boolean;
  showRightIcon?: boolean;
  onPressRight?: (() => void) | undefined;
  onBack?: boolean;
  onBackPress?: (() => void) | any;
  isHome?: boolean;
  avatarImg?: ImageURISource | null;
}

const AppHeader: React.FC<IProps> = ({
  headerTitle,
  showBackIcon,
  showRightIcon,
  onPressRight,
  avatarImg,
  onBack,
  onBackPress,
  isHome,
}) => {
  const navigation: any = useNavigation();

  const backgroundImage = isHome ? AppImages.head : AppImages.head;

  return (
    <ImageBackground
      source={backgroundImage}
      style={[
        styles.container,
        styles.homeContainer,
        {
          height: isHome ? hp(21) : hp(21),
          borderBottomLeftRadius: isHome ? 0 : hp(2),
          borderBottomRightRadius: isHome ? 0 : hp(2),
        },
      ]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={{flexDirection: 'row'}}>
          {showBackIcon ? (
            <Pressable
              onPress={() => (onBack ? onBackPress() : navigation.goBack())}
              style={styles.leftIcon}>
              <GlobalIcon
                color={AppColors.white}
                size={hp(2.5)}
                name={'chevron-back'}
                library={'Ionicons'}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={styles.leftIcon}>
              <GlobalIcon
                color={AppColors.white}
                size={hp(3)}
                name={'menu'}
                library={'Entypo'}
              />
            </Pressable>
          )}

          <View style={styles.homeContent}>
            {isHome && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('ProfileScreen')}>
                <Image source={avatarImg? {uri: avatarImg} : AppImages.ch1} style={styles.userAvatar} />
                <Text
                  style={[isHome ? styles.greetingText2 : styles.greetingText]}>
                  {headerTitle}
                </Text>
              </TouchableOpacity>
            )}
            {!isHome && (
              <Text
                style={[isHome ? styles.greetingText2 : styles.greetingText]}>
                {headerTitle}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                width: hp(10),
                justifyContent: 'space-around',
              }}>
              <Pressable onPress={() => navigation.navigate('Notifications')}>
                <GlobalIcon
                  color={AppColors.white}
                  size={hp(2.5)}
                  name={'bell'}
                  library={'Feather'}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('CartScreen')}>
                <GlobalIcon
                  color={AppColors.white}
                  size={hp(2.5)}
                  name={'shopping-cart'}
                  library={'Feather'}
                />
              </Pressable>
            </View>
          </View>
        </View>

       <SearchContainer/>
       
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: hp(2),
    borderBottomRightRadius: hp(2),
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: hp(2),
    paddingTop: StatusBarHeight(),
  },
  homeContainer: {
    height: hp(21),
    justifyContent: 'flex-start',
  },
  leftIcon: {
    width: '15%',
    top: hp(1),
  },
  heading: {
    alignItems: 'center',
    width: '70%',
  },
  rightIcon: {
    transform: [{rotate: '90deg'}],
    width: '15%',
    top: hp(2),
  },
  headerText: {
    fontSize: hp(1.6),
    color: AppColors.black,
    fontFamily: AppFonts.regular,
  },
  homeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingText: {
    fontSize: hp(3),
    color: AppColors.white,
    fontFamily: AppFonts.medium,
  },
  greetingText2: {
    fontSize: hp(1.5),
    color: AppColors.white,
    fontFamily: AppFonts.regular,
  },
  userAvatar: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    marginHorizontal: hp(1),
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#FFC300',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default AppHeader;
