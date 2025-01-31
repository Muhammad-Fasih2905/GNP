import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../../../components/app-header/app-header';
import Button from '../../../components/AppButton';
import ComicContent from '../../../components/ComicContent';
import GenreButton from '../../../components/GenreButton';
import Testmonials from '../../../components/Testmonials';
import {hp, wp} from '../../../const';
import useGenre from '../../../CustomHooks/useGenre';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  addToCartBook,
  fetchBooksByCategory,
  fetchCartItems,
  fetchClientReviews,
  fetchProductCategories,
  fetchTrendingBooks,
  getWebComics,
} from '../../../store/product/productAction';
import {
  productCategoryTypes,
  topTrendingBooksTypes,
} from '../../../store/product/productSlice';
import AppStyles from '../../../styles/AppStyles';
import {AppColors, AppFonts} from '../../../theme';
import {AppImages} from '../../../utils/AppImages';
import SearchItemsList from '../../../components/SearchItemsList';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const currentIndex = useRef(1);
  const trendingBookFlatlistRef = useRef<FlatList>(null);
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const isTrendingBooksLoading = useAppSelector(
    state => state.productSlice.isTrendingBooksLoading,
  );
  const isWebComicsLoading = useAppSelector(
    state => state.productSlice.isWebComicsLoading,
  );
  const userData = useAppSelector(state => state.userSlice.userData);
  const profileImage = useAppSelector(state => state.userSlice.profileImage);
  const currentCategoryBooks = useAppSelector(
    state => state.productSlice.currentCategoryBooks,
  );
  // console.log("currentCategoryBooks ===>", currentCategoryBooks)

  const isCategoryLoading = useAppSelector(
    state => state.commonSlice.isCategoryLoading,
  );
  const trendingBooks = useAppSelector(
    state => state.productSlice.topTrendingBooks,
  );
  const bookGenres = useAppSelector(
    state => state.productSlice.productCategories,
  );
  // console.log("bookGenres ===>", bookGenres)
  const webComics = useAppSelector(state => state.productSlice.webComics);
  const clientReviews = useAppSelector(
    state => state.productSlice.clientReviews,
  );
  const searchedItems = useAppSelector(
    state => state.productSlice.searchedItems,
  );
  const searchItemsCardActive = useAppSelector(
    state => state.productSlice.searchItemsCardActive,
  );
  const [readmoreWebComic, setReadMoreWebComic] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchTrendingBooks());
    dispatch(fetchProductCategories());
    dispatch(getWebComics());
    dispatch(fetchBooksByCategory({categoryId: 20}));
    // dispatch(fetchProductCategories());
    dispatch(fetchClientReviews());
    // dispatch(fetchBooksByCategory({categoryId: 20}));
  }, []);

  const refreshHomeScreen = () => {
    setRefreshing(true);
    dispatch(fetchTrendingBooks());
    dispatch(fetchProductCategories());
    dispatch(getWebComics());
    dispatch(fetchBooksByCategory({categoryId: 20}));
    dispatch(fetchClientReviews());
    setRefreshing(false);
  };

  const enableReadWebComic = () => {
    setReadMoreWebComic(true);
  };

  const scrollToNextIndex = (index: number) => {
    if (index < 0 || index >= trendingBooks.length) {
      return;
    }
    currentIndex.current = index;
    trendingBookFlatlistRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      const firstVisibleIndex = viewableItems[0]?.index || 0;
      currentIndex.current = firstVisibleIndex;
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const navToBookTrendingPage = (
    item: topTrendingBooksTypes,
    active?: number,
  ) => {
    // console.log("active :", active)
    navigation.navigate('BookTrending', {book: item, active: active});
  };

  const addToCartProduct = async (data: {
    quantity: number;
    product_id: number;
  }) => {
    try {
      if (!userData.ID) {
        return;
      }
      const response = await dispatch(
        addToCartBook({
          quantity: data.quantity,
          product_id: data.product_id,
          user_id: userData.ID,
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

  const {
    onGenrePress,
    browseCategoriesFlatlistRef,
    getItemLayout,
    active,
    handleActive,
    onScrollToIndexFailed,
    onLayout,
  } = useGenre();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <AppHeader
        avatarImg={profileImage}
        headerTitle={`Hello ! ${userData.username}`}
        isHome={true}
      />

      {searchItemsCardActive && (
        <SearchItemsList searchedItems={searchedItems} />
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refreshHomeScreen}
        nestedScrollEnabled={true}
        data={[0]}
        renderItem={({}) => (
          <>
            <Image
              style={{
                borderBottomLeftRadius: hp(2),
                borderBottomRightRadius: hp(2),
              }}
              source={AppImages.head2}
            />
            <View style={styles.container}>
              <View style={[AppStyles.rowBetween]}>
                <Text style={styles.headerTitle}>Top Trending Books</Text>
                <View style={[AppStyles.rowCenter, {}]}>
                  <TouchableOpacity
                    onPress={() => scrollToNextIndex(currentIndex.current - 1)}>
                    <Text style={styles.headerTitle}> ←</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => scrollToNextIndex(currentIndex.current + 1)}>
                    <Text style={styles.headerTitle}>→ </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/*------------ Trending Books */}
              {isTrendingBooksLoading ? (
                <View style={[AppStyles.alignJustifyCenter, {}]}>
                  <ActivityIndicator size={'large'} color={AppColors.primary} />
                </View>
              ) : (
                <FlatList
                  ListEmptyComponent={
                    <View style={[AppStyles.alignJustifyCenter]}>
                      <Text style={[styles.emptyDataStyles]}>
                        No books are trending currently
                      </Text>
                    </View>
                  }
                  data={trendingBooks}
                  ref={trendingBookFlatlistRef}
                  keyExtractor={item => item?.id?.toString()}
                  horizontal
                  onViewableItemsChanged={onViewableItemsChanged}
                  viewabilityConfig={viewabilityConfig}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('BookTrending', {book: item})
                      }
                      style={styles.trendingBookItem}>
                      <View style={styles.bookView}>
                        <Image
                          source={
                            item?.image ? {uri: item.image} : AppImages.guards
                          }
                          style={styles.trendingBookImage}
                        />
                      </View>
                      <Text style={styles.trendingBookTitle}>{item.title}</Text>
                    </Pressable>
                  )}
                />
              )}

              {/*-------------------- Web Comics */}
              <View style={styles.webComicSection}>
                <View style={styles.headerRow}>
                  <Text style={styles.sectionTitle}>Web Comics</Text>
                  <TouchableOpacity
                    onPress={() => {
                      onGenrePress(
                        bookGenres[bookGenres.length - 1].id,
                        bookGenres?.length - 1,
                      );
                      navigation.navigate('BooksScreen');
                    }}>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                </View>
                {isWebComicsLoading ? (
                  <View
                    style={[
                      AppStyles.alignJustifyCenter,
                      {marginVertical: hp(5)},
                    ]}>
                    <ActivityIndicator size={'large'} color={AppColors.white} />
                  </View>
                ) : (
                  <ComicContent
                    readmoreWebComic={readmoreWebComic}
                    isLoading={isLoading}
                    addToCartProduct={addToCartProduct}
                    enableReadWebComic={enableReadWebComic}
                    webComics={webComics}
                  />
                )}
              </View>

              {/*---------------------- Browse Genres */}
              <Text style={[AppStyles.bookstitle, {paddingTop: hp(5)}]}>
                Browse Genres
              </Text>
              <GenreButton
                active={active}
                handleActive={handleActive}
                getItemLayout={getItemLayout}
                FlatListRef={browseCategoriesFlatlistRef}
                onGenrePress={onGenrePress}
                genres={bookGenres}
                onScrollToIndexFailed={onScrollToIndexFailed}
                onLayout={onLayout}
              />

              <View style={styles.newBooksSection}>
                {isCategoryLoading && (
                  <ActivityIndicator style={{marginBottom: hp(2)}} />
                )}
                {
                  <FlatList
                    keyExtractor={(item, index) => index?.toString()}
                    // keyExtractor={(item, index) => item?.id?.toString()}
                    ListEmptyComponent={
                      <View style={[AppStyles.alignJustifyCenter]}>
                        <Text style={[styles.emptyDataStyles]}>
                          No books for current category are available
                        </Text>
                      </View>
                    }
                    data={currentCategoryBooks?.slice(0, 2)}
                    renderItem={({
                      item: book,
                    }: {
                      item: productCategoryTypes;
                    }) => {
                      return (
                        <View key={book.id} style={styles.bookItem}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={{uri: book?.image_url}}
                              style={styles.bookImage}
                            />
                            <View style={styles.bookDetails}>
                              <Text style={styles.bookTitle}>{book?.name}</Text>

                              <Button
                                onPress={() => navToBookTrendingPage(book, 0)}
                                title="READ MORE"
                                style={{
                                  width: '100%',
                                  alignSelf: 'center',
                                  marginVertical: hp(2),
                                }}
                                variant="primary"
                              />
                            </View>
                          </View>

                          <View>
                            <Text style={styles.bookDescription}>
                              {book?.long_description}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                }
              </View>

              {currentCategoryBooks.length > 0 && (
                <Button
                  style={[styles.highButton, {marginTop: hp(1), width: '100%'}]}
                  title="VIEW ALL"
                  onPress={() => navigation.navigate('BooksScreen')}
                />
              )}

              <Text style={[AppStyles.bookstitleMed, {paddingTop: hp(3)}]}>
                Posters That Tell Stories
              </Text>
              <Text
                style={[AppStyles.bookstitleSmall, {color: AppColors.gray700}]}>
                I'm Always in Awe of Graydon Navarre's Talent. Whether It's His
                Captivating Books or Mesmerizing Book Covers, He's Truly A
                Gifted Artist. Can't Wait To See More!
              </Text>

              {/* New Books Section */}
              <View style={styles.newBooksSection}>
                {currentCategoryBooks
                  ?.slice(0, 2)
                  .map((book: productCategoryTypes) => (
                    <View
                      key={book.id}
                      style={[
                        styles.bookItem,
                        {backgroundColor: AppColors.primary},
                      ]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.bookInfo}>
                          <Text
                            style={[
                              styles.bookTitle,
                              {color: AppColors.white},
                            ]}>
                            {book.name}
                          </Text>
                          <Text
                            style={[
                              styles.bookPrice,
                              {color: AppColors.gray600},
                            ]}>{`$${book.price}`}</Text>
                          <Button
                            onPress={() => navigation.navigate('Vanguards')}
                            title="ADD TO CART"
                            variant="primary"
                            style={styles.addToCartButton}
                          />
                        </View>
                        <View
                          style={{
                            backgroundColor: AppColors.white,
                            padding: hp(1),
                            borderRadius: 5,
                          }}>
                          <Image
                            source={AppImages.guards}
                            style={[styles.bookImage]}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
              </View>

              <View style={styles.testimonialsContainer}>
                <Text style={[AppStyles.bookstitleMed, {paddingBottom: hp(3)}]}>
                  What Our Clients Are Saying
                </Text>
                {clientReviews?.length === 0 ? (
                  <View
                    style={[
                      AppStyles.alignJustifyCenter,
                      {marginVertical: hp(0)},
                    ]}>
                    <Text style={[styles.emptyDataStyles]}>
                      No client reviews found
                    </Text>
                  </View>
                ) : (
                  <Testmonials clientReviews={clientReviews} />
                )}
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(10),
  },
  headerTitle: {
    fontSize: hp(2.7),
    paddingTop: hp(3),
    color: AppColors.black,
    fontFamily: AppFonts.bold,
  },
  bookView: {
    backgroundColor: '#59A6B3',
    borderRadius: 6,
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },
  trendingBookItem: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    marginRight: hp(1),
    marginTop: hp(5),
    width: hp(25),
  },
  trendingBookImage: {
    width: wp(35),
    resizeMode: 'contain',
    height: hp(20),
    top: hp(-5),
    zIndex: 10,
  },
  trendingBookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  // webcomic section

  webComicSection: {
    marginTop: hp(5),
    flexDirection: 'column',
    backgroundColor: AppColors.black,
  },
  headerRow: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: hp(2.7),
    fontFamily: AppFonts.medium,
    color: AppColors.white,
  },
  arrow: {
    fontSize: hp(2.7),
    color: AppColors.white,
  },
  comicContentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: wp(4),
  },
  comicImage: {
    width: wp(35),
    height: hp(25),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  comicDetails: {
    flex: 1,
    marginLeft: wp(4),
  },
  comicTitle: {
    fontSize: hp(2),
    fontFamily: AppFonts.regular,
    color: AppColors.white,
    marginBottom: hp(1),
  },
  emptyDataStyles: {
    fontSize: hp(2),
    fontFamily: AppFonts.regular,
    color: AppColors.black,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  price: {
    fontSize: hp(1.5),
    fontFamily: AppFonts.regular,
    color: AppColors.secondary,
  },
  comicInfo: {
    fontSize: hp(1.5),
    fontFamily: AppFonts.regular,
    color: AppColors.gray400,
    marginVertical: hp(1),
  },
  comicUpdate: {
    fontSize: hp(1.5),
    fontFamily: AppFonts.regular,
    color: AppColors.gray400,
  },
  addToCart: {
    fontSize: hp(1.5),
    color: AppColors.secondary,
    fontFamily: AppFonts.regular,
    marginTop: hp(1),
    textDecorationLine: 'underline',
  },

  // New Books Section styles
  newBooksSection: {
    marginTop: hp(5),
  },
  bookItem: {
    flexDirection: 'column',
    padding: wp(3),
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: AppColors.black,
  },
  bookImage: {
    width: wp(20),
    height: hp(15),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: hp(1.8),
    fontFamily: AppFonts.medium,
    color: '#333',
  },
  bookDescription: {
    fontSize: hp(1.5),
    fontFamily: AppFonts.medium,
    color: AppColors.black,
    marginTop: hp(1),
  },

  highButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.black,
    // marginVertical: hp(3)
  },

  bookInfo: {
    flex: 1,
    paddingRight: wp(3),
  },
  bookPrice: {
    fontSize: hp(1.8),
    color: AppColors.white,
  },
  addToCartButton: {
    marginTop: hp(1),
    backgroundColor: '#FFB400',
    width: '100%',
  },

  testimonialsContainer: {
    marginTop: hp(4),
    marginBottom: hp(4),
  },
});
