import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../const'
import { searchedItemsTypes, setSearchedItemsCard, topTrendingBooksTypes } from '../store/product/productSlice'
import AppStyles from '../styles/AppStyles'
import { AppColors, AppFonts } from '../theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Button from './AppButton'
import GlobalIcon from '../utils/GlobalIcon'
import { useAppDispatch } from '../store/hooks'

interface SearchItemsListTypes {
    searchedItems: searchedItemsTypes[];
}

const SearchItemsList: React.FC<SearchItemsListTypes> = ({ searchedItems }) => {

    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const navToBookTrendingPage = (item: topTrendingBooksTypes, active?: number) => {
        dispatch(setSearchedItemsCard(false))
        // console.log("active :", active)
        navigation.navigate('BookTrending', { book: item, active: active });
    };
    
    useFocusEffect(() => {
        // Reset the state when this screen loses focus
        return () => {
            dispatch(setSearchedItemsCard(false));
        };
    });

    return (
        // {
        // visible &&

        <View style={{
            // flex: 1,
            height: hp(50),
            position: 'absolute',
            zIndex: 2,
            width: '91%',
            alignSelf: 'center',
            top: hp(20),
            backgroundColor: AppColors.white,
            padding: hp(3),
            borderRadius: 5
        }}>
            <TouchableOpacity onPress={() => dispatch(setSearchedItemsCard(false))} style={{ position: 'absolute', right: 5, top: 5 }}>
                <GlobalIcon library='Ionicons' name={'close'} color={AppColors.black} size={hp(3)} />
            </TouchableOpacity>
            <FlatList
                style={{ marginTop: hp(2) }}
                showsVerticalScrollIndicator={false}
                // keyExtractor={(item, index) => index?.toString()}
                keyExtractor={(item, index) => item?.id?.toString()}
                ListEmptyComponent={
                    <View style={[AppStyles.alignJustifyCenter, { marginTop: hp(20) }]}>
                        <Text style={[styles.emptyDataStyles]}>No books found</Text>
                    </View>
                }
                data={searchedItems}
                renderItem={({ item: book }: { item: searchedItemsTypes }) => {
                    return <View key={book.id} style={styles.bookItem}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: book?.image }} style={styles.bookImage} />
                            <View style={styles.bookDetails}>
                                <Text style={styles.bookTitle}>{book?.name}</Text>

                                <Button
                                    onPress={() => navToBookTrendingPage(book, 0)}
                                    title='READ MORE' style={{ width: '100%', alignSelf: 'center', marginVertical: hp(2) }} variant='primary' />
                            </View>
                        </View>
                    </View>
                }}
            />
            {/* </ReusableModal> */}
        </View>
        // }
    )
}

export default SearchItemsList

const styles = StyleSheet.create({
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

    emptyDataStyles: {
        fontSize: hp(2),
        fontFamily: AppFonts.regular,
        color: AppColors.black,
        marginBottom: hp(1),
        textAlign: 'center'
    },
})