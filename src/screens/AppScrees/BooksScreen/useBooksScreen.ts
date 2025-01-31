import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {
  topTrendingBooksTypes,
} from '../../../store/product/productSlice';

const useBooksScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const bookGenres = useAppSelector(
    state => state.productSlice.productCategories,
  );
  const currentCategoryBooks = useAppSelector(
    state => state.productSlice.currentCategoryBooks,
  );
  const isCategoryLoading = useAppSelector(
    state => state.commonSlice.isCategoryLoading,
  );

  const navToBookTrendingPage = (item: topTrendingBooksTypes) => {
    navigation.navigate('BookTrending', {book: item});
  };

  return {
    bookGenres,
    currentCategoryBooks,
    isCategoryLoading,
    navToBookTrendingPage,
  };
};

export default useBooksScreen;

// const {
//   bookGenres,
//   navToBookTrendingPage,
//   currentCategoryBooks,
//   isCategoryLoading
// } = useBooksScreen()