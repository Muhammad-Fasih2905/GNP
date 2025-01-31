import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import Button from '../../../components/AppButton';
import ComicContent from '../../../components/ComicContent';
import {hp, wp} from '../../../const';
import AppLayout from '../../../layouts/AppLayout';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  addToCartBook,
  fetchCartItems,
  getWebComics,
} from '../../../store/product/productAction';
import AppStyles from '../../../styles/AppStyles';
import {AppColors} from '../../../theme';
import {AppImages} from '../../../utils/AppImages';
import GlobalIcon from '../../../utils/GlobalIcon';
import SearchItemsList from '../../../components/SearchItemsList';

const Webcomic = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userSlice.userData.ID);
  const [readmoreWebComic, setReadMoreWebComic] = useState(false);
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const webComics = useAppSelector(state => state.productSlice.webComics);
  const searchedItems = useAppSelector(
    state => state.productSlice.searchedItems,
  );
  const searchItemsCardActive = useAppSelector(
    state => state.productSlice.searchItemsCardActive,
  );

  useEffect(() => {
    dispatch(getWebComics());
  }, []);

  const addToCartProduct = async (data: {
    quantity: number;
    product_id: number;
  }) => {
    try {
      if (!userId) {
        return;
      }
      const response = await dispatch(
        addToCartBook({
          quantity: data.quantity,
          product_id: data.product_id,
          user_id: userId,
        }),
      );
      dispatch(fetchCartItems());

      if (response) {
        navigation.navigate('CartScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <AppHeader
        headerTitle={
          <Text>
            <Text style={styles.secondaryText}>W</Text>eb{' '}
            <Text style={styles.secondaryText}>C</Text>omic
          </Text>
        }
        isHome={false}
      />
      {searchItemsCardActive && (
        <SearchItemsList searchedItems={searchedItems} />
      )}
      <View style={{flex: 1}}>
        {readmoreWebComic === false ? (
          <ScrollView contentContainerStyle={styles.container}>
            <>
              <View style={AppStyles.rowBetween}>
                <Text style={AppStyles.bookstitle}>Web Commics</Text>
                <TouchableOpacity
                // onPress={() => {
                //   onGenrePress(bookGenres[bookGenres.length - 1].id, bookGenres?.length - 1)
                //   navigation.navigate('BooksScreen')
                // }}
                >
                  <GlobalIcon
                    color={AppColors.black}
                    size={hp(2.5)}
                    name={'long-arrow-alt-right'}
                    library={'FontAwesome5'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingVertical: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={[AppStyles.bookImage, {alignSelf: 'center'}]}
                  source={AppImages.guards}
                />
              </View>
              <Text style={AppStyles.booksDes}>{webComics[0]?.name}</Text>
              <Button
                style={{marginTop: hp(3)}}
                onPress={() => setReadMoreWebComic(true)}
                title="READ MORE"
                variant="primary"
              />
            </>
          </ScrollView>
        ) : (
          <View style={styles.container2}>
            <View style={[styles.webComicSection]}>
              <ComicContent
                webComics={webComics}
                readmoreWebComic={readmoreWebComic}
                isLoading={isLoading}
                addToCartProduct={addToCartProduct}
                enableReadWebComic={() => setReadMoreWebComic(true)}
              />
            </View>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default Webcomic;

const styles = StyleSheet.create({
  secondaryText: {
    color: AppColors.secondary,
  },
  container: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(10),
  },
  container2: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(7),
  },
  webComicSection: {
    marginTop: hp(5),
    flexDirection: 'column',
    backgroundColor: AppColors.black,
  },
});
