import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {addToCartBook} from '../../../store/product/productAction';
import { useNavigation } from '@react-navigation/native';

const useWebcomic = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [readmoreWebComic, setReadMoreWebComic] = useState(false);
  const isLoading = useAppSelector(state => state.commonSlice.isLoading);
  const webComics = useAppSelector(state=> state.productSlice.webComics);

  const enableReadWebComic = () => {
    setReadMoreWebComic(true);
  };

  const navToAdd2CartPage = () => {
    navigation.navigate('CartScreen');
  };

  const addToCartProduct = async (data: {
    quantity: number;
    product_id: number;
  }) => {
    try {
      const response = await dispatch(
        addToCartBook({quantity: data.quantity, product_id: data.product_id}),
      );

      if (response) {
        navToAdd2CartPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {addToCartProduct, enableReadWebComic, readmoreWebComic, isLoading, webComics};
};

export default useWebcomic;

const styles = StyleSheet.create({});



// const { addToCartProduct, readmoreWebComic, isLoading, webComics, enableReadWebComic } = useWebcomic();