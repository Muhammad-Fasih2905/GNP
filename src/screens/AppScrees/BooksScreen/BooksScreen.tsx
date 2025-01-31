import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { AppImages } from '../../../utils/AppImages';
import AppLayout from '../../../layouts/AppLayout';
import AppHeader from '../../../components/app-header/app-header';
import { AppColors, AppFonts, fontSizes } from '../../../theme';
import AppStyles from '../../../styles/AppStyles';
import { hp, wp } from '../../../const';
import GlobalIcon from '../../../utils/GlobalIcon';
import GenreButton from '../../../components/GenreButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import useBooksScreen from './useBooksScreen';
import { productCategoryTypes, topTrendingBooksTypes } from '../../../store/product/productSlice';
import useGenre from '../../../CustomHooks/useGenre';
import { useNavigation } from '@react-navigation/native';
import SearchItemsList from '../../../components/SearchItemsList';

// const books = [
//   { id: '1', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },
//   { id: '2', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },
//   { id: '3', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },
//   { id: '4', title: 'Pursuit Of The Peacekeepers', image: AppImages.guards },
// ];




const BookCard: React.FC<{ title: string, image: any, onBookPress: () => void }> = ({ title, image, onBookPress }) => {

  return <View style={styles.bookCard}>
    <View style={styles.bookBack}>
      <Image source={image} style={styles.bookImage} />
    </View>
    <View style={[AppStyles.rowBetween, { width: '100%', paddingTop: hp(2) }]}>
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
}


const BooksScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const bookGenres = useAppSelector(
    state => state.productSlice.productCategories,
  );
  const currentCategoryBooks = useAppSelector(
    state => state.productSlice.currentCategoryBooks,
  );
  // console.log("currentCategoryBooks", currentCategoryBooks?.length)
  const isCategoryLoading = useAppSelector(
    state => state.commonSlice.isCategoryLoading,
  );
  const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
  const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
  const { onGenrePress, browseCategoriesFlatlistRef2, getItemLayout, active, handleActive, onScrollToIndexFailed, onLayout } = useGenre()

  return (
    <AppLayout>
      <AppHeader headerTitle={
        <Text>
          Bo<Text style={styles.secondaryText}>ok</Text><Text>s</Text>
        </Text>
      } isHome={false} />
      {
        searchItemsCardActive &&
        <SearchItemsList searchedItems={searchedItems} />
      }
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={AppStyles.bookstitle}>Browse Genres</Text>
          <GenreButton
            onLayout={onLayout}
            onScrollToIndexFailed={onScrollToIndexFailed}
            handleActive={handleActive}
            active={active}
            getItemLayout={getItemLayout}
            FlatListRef={browseCategoriesFlatlistRef2}
            onGenrePress={onGenrePress}
            genres={bookGenres} />
          {
            isCategoryLoading &&
            <ActivityIndicator style={{ marginBottom: hp(2) }} color={AppColors.primary} />
          }
          <FlatList
          ListEmptyComponent={
            <View style={[AppStyles.alignJustifyCenter]}>
            <Text style={[styles.emptyDataStyles]}>No books for current category are available</Text>
          </View>
          }
            scrollEnabled={false}
            data={currentCategoryBooks}
            // keyExtractor={(item) => item?.id?.toString()} 
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({ item }: { item: productCategoryTypes }) => <BookCard
              onBookPress={() => navigation.navigate('BookTrending', { book: item, active: 0 })}
              title={item?.name}
              image={{ uri: item?.image_url }} />}
            numColumns={2}
            contentContainerStyle={styles.booksContainer}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  secondaryText: {
    color: AppColors.secondary,
  },

  genreContainer: {
    paddingVertical: 16,
  },
  box: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary
  },
  bookBack: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(4),
    paddingVertical: hp(1)
  },

  booksContainer: {
    paddingBottom: 16,
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
  emptyDataStyles: {
    fontSize: hp(2),
    fontFamily: AppFonts.regular,
    color: AppColors.black,
    marginBottom: hp(1),
    textAlign: 'center'
  },

});

export default BooksScreen;
