import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from '../const'
import { AppImages } from '../utils/AppImages'
import { AppColors, AppFonts, AppRadius, fontSizes } from '../theme'
import { webComicTypes } from '../store/product/productSlice'
import Button from './AppButton'
import ReusableModal from './ReusableModal'
import GlobalIcon from '../utils/GlobalIcon'
import Pdf from 'react-native-pdf';
import AppStyles from '../styles/AppStyles'
export interface ComicContentTypes {
    readmoreWebComic: boolean,
    isLoading: boolean,
    enableReadWebComic: () => void,
    webComics: webComicTypes[],
    addToCartProduct: (object: any) => void
}

const ComicContent: React.FC<ComicContentTypes> = ({ readmoreWebComic, enableReadWebComic, webComics, addToCartProduct, isLoading }) => {


    const [visible, setVisible] = useState(false)
    // const source = { uri: 'https://graydonpnavarre.com/product/vanguards-of-silver-and-gold.pdf', cache: true };
    const chapterKey = "chapter 1";
    const source = { uri: webComics[0]?.pdfs[chapterKey], cache: true };
    const [showUI, setShowUI] = useState(false);

    const onPageChanged = (page: number, numberOfPages: number) => {
        if (page === numberOfPages) {
            setShowUI(true);
        } else {
            setShowUI(false); // Hide UI when it's not the last page
        }
    };

    return (
        <>
            {
                webComics?.length === 0 ?

                    //     <View style={[AppStyles.alignJustifyCenter, {marginVertical: hp(5)}]}>
                    //     <ActivityIndicator size={'large'} color={AppColors.primary} />
                    //   </View>
                    <View style={[AppStyles.alignJustifyCenter, { marginVertical: hp(5) }]}>
                        <Text style={[styles.emptyDataStyles, { color: AppColors.white }]}>No web comics found</Text>
                    </View>
                    :
                    <>
                        <View style={styles.comicContentWrapper}>
                            <Image source={{ uri: webComics[0]?.image }} style={styles.comicImage} />

                            <View style={styles.comicDetails}>
                                <Text style={styles.comicTitle}>{webComics[0]?.name}</Text>
                                <Text style={styles.price}>{`${webComics[0]?.price}.00 / Month`}</Text>
                                <Text style={styles.comicInfo}>{`${webComics[0]?.chapters} Chapters, ${webComics[0]?.page_number} Each Chapter`}</Text>
                                <Text style={styles.comicUpdate}>{`UPDATES: ${webComics[0]?.update_frequency}`}</Text>
                                {/* <Text onPress={() => addToCartProduct({ quantity: 1, product_id: webComics[0].id })} style={styles.addToCart}>Add To Cart</Text> */}
                                <Text style={styles.subscribersCount}>{`ACTIVE SUBSCRIBER: ${webComics[0]?.active_subscribers}`}</Text>
                            </View>
                        </View>
                        {readmoreWebComic ?
                            <>
                                <Button onPress={() => addToCartProduct({ quantity: 1, product_id: webComics[0].id })} disabled={isLoading} loading={isLoading} title='Add to cart' style={{ width: '85%', alignSelf: 'center', marginVertical: hp(2), marginTop: hp(0) }} variant='primary' />
                                <Button
                                    onPress={() => setVisible(true)}
                                    // onPress={enableReadWebComic}
                                    title='Read Sample' style={{ width: '85%', alignSelf: 'center', marginBottom: hp(2) }} variant='primary' />
                            </>
                            :
                            <Button onPress={enableReadWebComic} title='READ MORE' style={{ width: '85%', alignSelf: 'center', marginVertical: hp(2) }} variant='primary' />
                        }
                    </>
            }

            <ReusableModal visible={visible} onClose={() => setVisible(false)}>

                <Pressable style={styles.readSampleContainer}>
                    <Text style={styles.headerTitle}>Read Samples</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => setVisible(false)}>
                        <GlobalIcon name={'close'} library='AntDesign' color={AppColors.white} size={hp(2.5)} />
                    </TouchableOpacity>
                </Pressable>
                <TouchableWithoutFeedback
                    style={styles.container}
                >
                    <Pdf
                        trustAllCerts={false}
                        source={source}
                        onLoadComplete={(numberOfPages, filePath) => {
                            // console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            // console.log(`Current page: ${page}`);
                            onPageChanged(page, numberOfPages)
                        }}
                        onError={(error) => {
                            console.log("opened pdf error:", error);
                        }}
                        onPressLink={(uri) => {
                            // console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf} />
                </TouchableWithoutFeedback>
                {showUI &&
                    <View style={{ paddingHorizontal: hp(5), paddingVertical: hp(2) }}>
                        <Text style={styles.sampleHeading}>Enjoying This Sample?</Text>
                        <Text style={styles.sampleText}>It Is A Long Established Fact That A Reader Will Be Long Distracted By The Readable Content Of A Page When Looking At Its Layout.</Text>
                        <View style={[styles.comicContentWrapper, { paddingVertical: 0, alignItems: 'center', marginBottom: hp(1), justifyContent: 'flex-start' }]}>
                            <Image source={AppImages.guards} style={[styles.comicImage, { height: hp(20), width: wp(25), }]} resizeMode='contain' />
                            <View style={styles.comicDetails}>
                                <Text style={[styles.comicTitle, styles.textColor, { fontSize: fontSizes.xs, fontFamily: AppFonts.bold }]}>{webComics[0]?.name}</Text>
                                <Text style={[styles.price, styles.textColor]}>{`${webComics[0]?.price}.00 / Month`}</Text>
                                <Button
                                    iconRight={
                                        <GlobalIcon name={'shoppingcart'} library='AntDesign' color={AppColors.black} size={hp(2)} />
                                    }
                                    onPress={() => addToCartProduct({ quantity: 1, product_id: webComics[0].id })}
                                    disabled={isLoading}
                                    loading={isLoading}
                                    title='Add to cart'
                                    textStyle={{ fontSize: fontSizes.xs }}
                                    style={styles.cartBtn} variant='primary' />
                            </View>
                        </View>
                    </View>
                }


            </ReusableModal>

        </>



    )
}

export default ComicContent

const styles = StyleSheet.create({
    readSampleContainer: {

        paddingHorizontal: hp(5),
        paddingTop: hp(3),
        marginBottom: hp(1),
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    cartBtn:
        { width: '85%', alignSelf: 'flex-start', marginVertical: hp(0), marginTop: hp(0), gap: hp(1), lineHeight: 16, },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 27,
        marginHorizontal: hp(5),
        position: 'relative'
    },
    sampleHeading: {
        textAlign: 'center',
        fontFamily: AppFonts.bold,
        color: AppColors.black,
        fontSize: fontSizes.s,
    },
    sampleText: {
        textAlign: 'center',
        fontSize: fontSizes.s,
        fontFamily: AppFonts.regular,
        color: AppColors.black

    },
    pdf: {
        flex: 1,
        // width: Dimensions.get('window').width,
        // height: hp(80),
        // height: Dimensions.get('window').height,
        // paddingHorizontal: hp(5),
        backgroundColor: AppColors.white,
        // alignSelf: 'center'
    },
    textColor: {
        color: AppColors.black
    },

    // webcomic section 
    subscribersCount: {
        fontSize: fontSizes.sm,
        fontFamily: AppFonts.regular,
        color: AppColors.white,
        marginBottom: hp(1),
        marginTop: hp(1),
    },

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
        textAlign: 'center'
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
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.primary,
        width: 40,
        height: 40,
        borderRadius: AppRadius.sm,

        zIndex: 1,
    },
    headerTitle: {
        fontSize: hp(2.7),
        // left: hp(3),
        color: AppColors.black,
        fontFamily: AppFonts.regular,
    },

})