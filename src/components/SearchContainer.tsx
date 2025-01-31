import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GlobalIcon from '../utils/GlobalIcon'
import { Controller, useForm } from 'react-hook-form'
import { AppColors, AppFonts } from '../theme'
import Input from './AppInput'
import { hp, wp } from '../const'
import Button from './AppButton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { searchABook } from '../store/product/productAction'
import ReusableModal from './ReusableModal'
import AppStyles from '../styles/AppStyles'
import { productCategoryTypes, searchedItemsTypes, setSearchedItemsCard, topTrendingBooksTypes } from '../store/product/productSlice'
import { useNavigation } from '@react-navigation/native'

export interface SearchTypes {
    search_term: string
}

const SearchContainer: React.FC<any> = () => {

    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchTypes>({
        defaultValues: {
            search_term: '',
        },
    });
    const [searchLoading, setSearchLoading] = useState(false);




    const onSubmit = async (data: SearchTypes) => {
        try {
            // console.log(data)
            setSearchLoading(true)
            const response = await dispatch(searchABook({ search_term: data.search_term })).unwrap()
            if (response) {
                dispatch(setSearchedItemsCard(true))
            }
        } catch (error: any) {
            console.log(error?.message)
        }
        finally {
            setSearchLoading(false)
        }
    }


    return (
        <View style={styles.searchContainer}>

            <Controller
                name="search_term"
                control={control}
                rules={{
                    required: { value: true, message: 'card expiry date is required' },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        containerStyle={styles.searchInput}
                        stylesInput={styles.textColor}
                        labelStyles={{ display: 'none' }}
                        label=''
                        placeholder="Search a book..."
                        styleInputC={{ borderRadius: 0 }}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}

                    />

                )}
            />
            <Button
                onPress={handleSubmit(onSubmit)}
                loading={searchLoading}
                title='F'
                style={styles.searchButton}
                textStyle={{ display: 'none' }}
                icon={<GlobalIcon
                    library="Ionicons"
                    name="search"
                    size={20}
                    color="#000080"
                />}
            />

        </View>
    )
}

export default SearchContainer

const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        // alignItems: 'flex-start',
        marginTop: 15,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        // height: hp(6),
        marginBottom: 0,
        borderRadius: 0,
        // borderTopRightRadius: 0,
        // borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    searchButton: {
        height: 'auto',
        padding: 10,
        paddingHorizontal: hp(2),
        marginVertical: 0,
        backgroundColor: '#FFC300',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 0,
    },
    textColor: {
        color: AppColors.black
    },

})