import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Ref, RefObject, useState } from 'react'
import { AppColors, AppFonts, fontSizes } from '../theme';
import { hp } from '../const';
import { productCategoryTypes } from '../store/product/productSlice';


// const genres = ['Action Adventure', 'Drama', 'Fantasy', 'Military'];
export interface GenreButtonTypes {
    genres: productCategoryTypes[];
    onGenrePress: (arg0: number, arg1: number) => void;
    FlatListRef: RefObject<FlatList<any>>;
    getItemLayout: any,
    handleActive: (arg0: number) => void,
    active: any;
    onScrollToIndexFailed: any,
    onLayout: any,
}

const GenreButton: React.FC<GenreButtonTypes> = ({ genres, onGenrePress, FlatListRef, getItemLayout, handleActive, active, onScrollToIndexFailed, onLayout }) => {

    // console.log("index in GenreButton component: ", active)

    const handlePress = (id: number, index: number) => {
        handleActive(index);
        onGenrePress(id, index);
    };

    const GenreButton: React.FC<{ title: string, onGenrePress: (arg0: number, arg1: number) => void, id: number, index: number }> = ({ title, id, index }) => {
        // console.log("Genre btn called", index)
        return (
            <TouchableOpacity
                key={index}
                onPress={() => handlePress(id, index)}
                style={[styles.genreButton, { backgroundColor: active === index ? AppColors.gray400 : AppColors.secondary }]}>
                <Text style={styles.genreButtonText}>{title}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <FlatList
            onLayout={onLayout}
            // getItemLayout={getItemLayout}
            onScrollToIndexFailed={onScrollToIndexFailed}
            ref={FlatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={genres}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item, index }: { item: productCategoryTypes, index: number }) => <GenreButton index={index} onGenrePress={onGenrePress} id={item.id} title={item.name} />}
            contentContainerStyle={styles.genreContainer}
        />
    )
}

export default React.memo(GenreButton)

const styles = StyleSheet.create({
    genreContainer: {
        paddingVertical: 16,
    },
    genreButton: {
        backgroundColor: AppColors.secondary,
        borderRadius: hp(.6),
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    genreButtonText: {
        color: AppColors.black,
        fontFamily: AppFonts.medium,
        fontSize: fontSizes.xs,
    },
})