import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AppHeader from '../../components/app-header/app-header';
import {AppColors, AppFonts, fontSizes} from '../../theme';
import {hp, wp} from '../../const';
import Button from '../../components/AppButton';
import AppStyles from '../../styles/AppStyles';
import {AppImages} from '../../utils/AppImages';
import GlobalIcon from '../../utils/GlobalIcon';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  addToCartBook,
  fetchCartItems,
  getRelatedBooks,
  getVanguardBook,
} from '../../store/product/productAction';
import {useNavigation} from '@react-navigation/native';
import {setScreenLoading} from '../../store/common/commonSlice';
import SearchItemsList from '../../components/SearchItemsList';

// const books = [
//   { id: '1', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },
//   { id: '2', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },

// ];

const BookCard: React.FC<{
  title: string;
  image: any;
  onBookPress: () => void;
}> = ({title, image, onBookPress}) => (
  <View style={styles.bookCard}>
    <View style={styles.bookBack}>
      <Image source={{uri: image}} style={styles.bookImage} />
    </View>
    <View style={[AppStyles.rowBetween, {width: '100%', paddingTop: hp(2)}]}>
      <Text style={AppStyles.bookstitleSmall}>{title}</Text>
      <TouchableOpacity onPress={onBookPress} style={styles.box}>
        <GlobalIcon
          name="book"
          library="Entypo"
          size={hp(2.5)}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const Vanguards = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const vanguardBook = useAppSelector(state => state.productSlice.vanguardBook);
  const relatedBooks = useAppSelector(state => state.productSlice.relatedBooks);
  const isScreenLoading = useAppSelector(
    state => state.commonSlice.isScreenLoading,
  );
  // const [isScreenLoading, setIsScreenLoading] = useState(false);
  const searchedItems = useAppSelector(
    state => state.productSlice.searchedItems,
  );
  const searchItemsCardActive = useAppSelector(
    state => state.productSlice.searchItemsCardActive,
  );
  const userId = useAppSelector(state => state.userSlice.userData.ID);
  const [cartLoading, setCartLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const refreshPage = async () => {
    setRefreshing(true);
    await Promise.allSettled([fetchVanguardBook(), fetchRelatedBooks()]);
    setRefreshing(false);
  };

  const fetchVanguardBook = async () => {
    //currently providing static product id
    try {
      const response = await dispatch(
        getVanguardBook({productId: 262}),
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const fetchRelatedBooks = async () => {
    //currently providing static product id
    try {
      const response = await dispatch(
        getRelatedBooks({product_id: 262}),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartProduct = async (data: {
    quantity: number;
    product_id: number;
  }) => {
    try {
      if (!userId) {
        return;
      }
      setCartLoading(true);
      const response = await dispatch(
        addToCartBook({
          quantity: data.quantity,
          product_id: data.product_id,
          user_id: userId,
        }),
      ).unwrap();
      dispatch(fetchCartItems());

      if (response) {
        navigation.navigate('CartScreen');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    Promise.allSettled([fetchVanguardBook(), fetchRelatedBooks()]);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader
        headerTitle={
          <Text>
            Vang<Text style={styles.secondaryText}>uards</Text>
          </Text>
        }
        isHome={false}
      />
      {searchItemsCardActive && (
        <SearchItemsList searchedItems={searchedItems} />
      )}
      {isScreenLoading && !refreshing ? (
        <ActivityIndicator
          style={{paddingTop: hp(30)}}
          size={'large'}
          color={AppColors.primary}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={refreshPage} refreshing={refreshing} />
          }
          style={styles.content}>
          <View style={styles.cartC}>
            <View style={styles.productCard}>
              <Image
                source={{uri: vanguardBook?.image}}
                style={styles.bookCover}
              />
              <View style={styles.productInfo}>
                <Text style={styles.bookTitle}>{vanguardBook?.name}</Text>
                <Text style={styles.price}>{`$${vanguardBook?.price}`}</Text>
              </View>
            </View>
            <Button
              style={{marginTop: hp(2)}}
              fullWidth
              title="ADD TO CART"
              loading={cartLoading}
              onPress={() => {
                vanguardBook?.id &&
                  addToCartProduct({quantity: 1, product_id: vanguardBook.id});
              }}
            />
          </View>

          <View style={styles.textC}>
            <View style={styles.tabContainer}>
              <Button
                style={[
                  styles.highButton,
                  {
                    marginTop: hp(2),
                    width: '47%',
                    backgroundColor:
                      active === 0 ? AppColors.primary : AppColors.white,
                  },
                ]}
                textStyle={{
                  color: active === 0 ? AppColors.white : AppColors.primary,
                }}
                title="DESCRIPTION"
                onPress={() => {
                  setActive(0);
                }}
              />
              <Button
                style={[
                  styles.highButton,
                  {
                    marginTop: hp(2),
                    width: '47%',
                    backgroundColor:
                      active === 1 ? AppColors.primary : AppColors.white,
                  },
                ]}
                title="HIGHLIGHT"
                textStyle={{
                  color: active === 1 ? AppColors.white : AppColors.primary,
                }}
                onPress={() => {
                  setActive(1);
                }}
              />
            </View>
            <Text style={styles.description}>
              {active === 0
                ? vanguardBook?.description
                : vanguardBook?.short_description}
            </Text>
            {/* <Text style={styles.description}>
            Dive Deep Into A Space Odyssey Where Eight Intrepid Peacemakers, United Under One Valiant Leader, Stand Poised To Confront A Cosmic Adversary. Every Detail Of This Poster Pulls You Into A Narrative Of Heroism, Camaraderie, And The Eternal Fight Between Good And Evil.        </Text>
          <Text style={styles.description}>
            Crafted For The Dreamers And Storytellers, This Fictional Portrayal Is A Beacon For All Who Dare To Venture Beyond The Stars. Dive In And Let The Adventure Unfold.        </Text> */}
            <Text style={[AppStyles.bookstitleMed, {paddingVertical: hp(2)}]}>
              Related Products
            </Text>

            <FlatList
              ListEmptyComponent={<Text>No related books available.</Text>}
              scrollEnabled={false}
              data={relatedBooks}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item}) => (
                <BookCard
                  onBookPress={() =>
                    navigation.navigate('BookTrending', {book: item, active: 0})
                  }
                  title={item.name}
                  image={item.image}
                />
              )}
              numColumns={2}
              contentContainerStyle={styles.booksContainer}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Vanguards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  secondaryText: {
    color: AppColors.secondary,
  },
  content: {
    flex: 1,
  },
  textC: {
    paddingHorizontal: hp(2),
  },
  cartC: {
    flexDirection: 'column',
    backgroundColor: AppColors.black,
    padding: wp(4),
    margin: wp(4),
  },
  highButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.primary,
    // marginVertical: hp(3)
  },

  productCard: {
    flexDirection: 'row',
  },
  bookCover: {
    width: wp(28),
    height: hp(20),
    resizeMode: 'cover',
    borderRadius: wp(1),
    alignSelf: 'center',
  },
  productInfo: {
    marginTop: hp(2),
    marginHorizontal: hp(2),
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bookTitle: {
    color: AppColors.white,
    fontSize: wp(4),
    fontFamily: AppFonts.medium,
  },
  price: {
    color: AppColors.secondary,
    fontSize: wp(4),
    fontFamily: AppFonts.bold,
    marginTop: hp(1),
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },

  description: {
    paddingVertical: hp(1),
    color: AppColors.black,
    fontSize: fontSizes.xs,
    fontFamily: AppFonts.medium,
  },

  // books

  booksContainer: {
    paddingBottom: hp(10),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  bookCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: hp(2),
    marginBottom: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  bookImage: {
    width: 75,
    height: 115,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  box: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
  },
  bookBack: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(4),
    paddingVertical: hp(1),
  },
});
