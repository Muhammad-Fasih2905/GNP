import {createSlice} from '@reduxjs/toolkit';

export interface CartItemTypes {
  cart_item_key: string;
  product_id: number | null;
  product_name: string;
  price: string;
  quantity: number | null;
  total: number | null;
  subtotal: number | null;
  image: string | null;
  product_url: string | null;
}

export interface clientReviewsTypes {
  id: number;
  title: string;
  content: string;
  featured_image: string;
}
export interface productInfoTypes {
  id: number;
  slug: string;
  name: string;
  price: string;
}
export interface webComicTypes {
  id: number;
  name: string;
  link: string;
  price: string;
  image: string;
  page_number: string;
  chapters: string;
  update_frequency: string;
  pdfs: {
    [key: string]: string;
  };
  active_subscribers: number;
}
export interface productCategoryTypes {
  id: number;
  slug: string;
  name: string;
  image_url: string;
  price: string;
  long_description: string;
  short_description: string;
  categories: [];
  update_frequency: null;
  number_of_pages: null;
  chapters: null;
}

export interface topTrendingBooksTypes {
  id: number;
  title: string;
  description: string;
  link: string;
  pdf_url: string;
  image: string;
}

export interface relatedBooksTypes {
  id: number;
  name: string;
  price: string;
  short_description: string;
  description: string;
  category_ids: number[];
  image: string;
}
export interface vanguardBookTypes {
  id: number;
  name: string;
  image: string;
  permalink: string;
  price: string;
}

export interface searchedItemsTypes {
  id: number;
  name: string;
  image: string;
  permalink: string;
  price: string;
}
export interface productSliceStateTypes {
  topTrendingBooks: topTrendingBooksTypes[];
  clientReviews: clientReviewsTypes[];
  productCategories: productCategoryTypes[];
  productCart: CartItemTypes[];
  webComics: webComicTypes[];
  currentCategoryBooks: [];
  currentCategoryIndex: number;
  allOrders: [];
  vanguardBook: relatedBooksTypes | null;
  relatedBooks: relatedBooksTypes[];
  searchedItems: searchedItemsTypes[];
  searchItemsCardActive: boolean;
  isTrendingBooksLoading: boolean;
  isWebComicsLoading: boolean;
  isSearchLoading: boolean;
}

const initialState = <productSliceStateTypes>{
  clientReviews: [],
  topTrendingBooks: [],
  productCategories: [],
  productCart: [],
  webComics: [],
  currentCategoryBooks: [],
  currentCategoryIndex: 0,
  allOrders: [],
  vanguardBook: null,
  relatedBooks: [],
  searchedItems: [],
  searchItemsCardActive: false,
  isTrendingBooksLoading: false,
  isWebComicsLoading: false,
  isSearchLoading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProductInfo: (state, {payload}) => {},
    saveTopTrendingBooks: (state, {payload}) => {
      state.topTrendingBooks = payload;
    },
    setTrendingBooksLoading: (state, {payload}) => {
      state.isTrendingBooksLoading = payload;
    },
    setWebComicsLoading: (state, {payload}) => {
      state.isWebComicsLoading = payload;
    },
    setSearchLoading: (state, {payload}) => {
      state.isSearchLoading = payload;
    },

    saveVanguardBook: (state, {payload}) => {
      state.vanguardBook = payload;
    },
    saveRelatedBooks: (state, {payload}) => {
      state.relatedBooks = payload;
    },
    saveProductCategories: (state, {payload}) => {
      state.productCategories = payload;
    },
    saveClientReviews: (state, {payload}) => {
      state.clientReviews = payload;
    },
    saveToCart: (state, {payload}) => {
      state.productCart = payload;
    },
    saveWebComics: (state, {payload}) => {
      state.webComics = payload;
    },
    saveCurrentCategoryBooks: (state, {payload}) => {
      state.currentCategoryBooks = payload;
    },
    setCurrentCategoryIndex: (state, {payload}) => {
      state.currentCategoryIndex = payload;
    },
    // setCurrentCategoryId: (state, {payload}) => {
    //   state.currentCategoryIndex = payload;
    // },
    saveAllOrders: (state, {payload}) => {
      state.allOrders = payload;
    },
    saveSearchedItems: (state, {payload}) => {
      state.searchedItems = payload;
    },
    setSearchedItemsCard: (state, {payload}) => {
      state.searchItemsCardActive = payload;
    },
    resetProductSlice: () => initialState,
  },
});

export const {
  resetProductSlice,
  setSearchLoading,
  setWebComicsLoading,
  setTrendingBooksLoading,
  setSearchedItemsCard,
  saveSearchedItems,
  saveRelatedBooks,
  saveVanguardBook,
  saveProductInfo,
  saveClientReviews,
  saveTopTrendingBooks,
  saveProductCategories,
  saveToCart,
  saveWebComics,
  saveCurrentCategoryBooks,
  saveAllOrders,
  setCurrentCategoryIndex,
} = productSlice.actions;

export default productSlice.reducer;
