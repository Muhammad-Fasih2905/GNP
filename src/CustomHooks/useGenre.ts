import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooksByCategory } from '../store/product/productAction';
import { setCurrentCategoryIndex } from '../store/product/productSlice';

const useGenre = () => {
  const dispatch = useAppDispatch();
  const bookGenres = useAppSelector(
    state => state.productSlice.productCategories,
  );
  const browseCategoriesFlatlistRef = useRef<FlatList>(null);
  const browseCategoriesFlatlistRef2 = useRef<FlatList>(null);
  const currentCategoryIndexGlobal = useAppSelector(
    state => state.productSlice.currentCategoryIndex,
  );

  const currentCategoryIndex = useRef(currentCategoryIndexGlobal);
  const [active, setActive] = useState<number>(currentCategoryIndexGlobal);
  const [isListReady, setIsListReady] = useState(false);

  const onLayout = () => {
    setIsListReady(true);
  };

  const categoryScrollToNextIndex = (index: number) => {
    if (index < 0 || index >= bookGenres.length) {
      console.log('index out of bounds');
      return;
    }
    currentCategoryIndex.current = index;
    browseCategoriesFlatlistRef.current?.scrollToIndex({
      index: index,
      viewOffset: 0.5,
      animated: true,
    });
    browseCategoriesFlatlistRef2.current?.scrollToIndex({
      index: index,
      viewOffset: 0.5,
      animated: true,
    });
  };

  const onScrollToIndexFailed = ({
    index,
    highestMeasuredFrameIndex,
  }: {
    index: number;
    highestMeasuredFrameIndex: number;
  }) => {
    console.warn(
      `Scroll failed. Index: ${index}, Highest Measured Index: ${highestMeasuredFrameIndex}`,
    );
    // Scroll to the closest measured index
    if (highestMeasuredFrameIndex >= 0) {
      browseCategoriesFlatlistRef.current?.scrollToIndex({
        index: highestMeasuredFrameIndex,
        animated: true,
      });
    } else {
      browseCategoriesFlatlistRef.current?.scrollToOffset({
        offset: index * 200, // Estimate the average item height
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (
      currentCategoryIndexGlobal >= 0 &&
      currentCategoryIndexGlobal < bookGenres.length &&
      isListReady
    ) {
      try {
        // console.log('Called and index', currentCategoryIndexGlobal);
        handleActive(currentCategoryIndexGlobal);
        browseCategoriesFlatlistRef.current?.scrollToIndex({
          index: currentCategoryIndexGlobal,
          viewOffset: 0.5,
          animated: true,
        });
        browseCategoriesFlatlistRef2.current?.scrollToIndex({
          index: currentCategoryIndexGlobal,
          viewOffset: 0.5,
          animated: true,
        });
      } catch (error) {
        console.log('useEffect scrollindex error', error);
      }
    }
  }, [currentCategoryIndexGlobal, bookGenres.length, isListReady]);
  // }, [active]);

  // The height of each item in the list (adjust as needed)
  const ITEM_HEIGHT = 70; // Adjust this based on your item height

  // Implement getItemLayout to provide the location of items
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT, // height of each item
    offset: ITEM_HEIGHT * index, // offset for each item based on index
    index,
  });

  const onGenrePress = async (id: number, index: number) => {
    try {
      handleActive(index);
      categoryScrollToNextIndex(index);
      const response = await dispatch(fetchBooksByCategory({ categoryId: id }));
      dispatch(setCurrentCategoryIndex(index));

      // if (response) {
      //   dispatch(setCurrentCategoryIndex(index));
      // } else {
      //   handleActive(currentCategoryIndexGlobal);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = (index: number) => {
    setActive(index);
  };

  return {
    onGenrePress,
    browseCategoriesFlatlistRef,
    browseCategoriesFlatlistRef2,
    getItemLayout,
    active,
    handleActive,
    onScrollToIndexFailed,
    onLayout,
  };
};

export default useGenre;

const styles = StyleSheet.create({});

// const { onGenrePress, browseCategoriesFlatlistRef, getItemLayout, active, handleActive, onScrollToIndexFailed, onLayout } = useGenre();