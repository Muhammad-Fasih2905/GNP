import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppLayout from '../../layouts/AppLayout';
import AppHeader from '../../components/app-header/app-header';
import { AppColors, AppFonts, fontSizes } from '../../theme';
import AppStyles from '../../styles/AppStyles';
import { AppImages } from '../../utils/AppImages';
import { hp } from '../../const';
import Testmonials from '../../components/Testmonials';
import { useAppSelector } from '../../store/hooks';
import SearchItemsList from '../../components/SearchItemsList';





const AboutUsScreen: React.FC = () => {
  const clientReviews = useAppSelector(state=> state.productSlice.clientReviews)
   const searchedItems = useAppSelector(state => state.productSlice.searchedItems)
    const searchItemsCardActive = useAppSelector(state => state.productSlice.searchItemsCardActive)
  return (
    <AppLayout>
      <AppHeader headerTitle={
        <Text>
          Ab<Text style={styles.secondaryText}>out</Text><Text> Us</Text>
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
          <Text style={AppStyles.bookstitle}>About Graydon P. Navarre</Text>
          <View style={[styles.imgC]}>
            <Image style={styles.aboutImage} source={AppImages.about} />
          </View>
        </View>
        <View style={styles.containerTxt}>
          <Text style={AppStyles.bookstitleSmall}>Embark On A Journey Into The Enchanting Realm Created By Graydon P. Navarre, A Versatile Writer Whose Extraordinary Storytelling Talent Is Evident In His Captivating Novels And Comics. Graydon's Passion For Weaving Captivating Tales Has Resulted In A Collection Of Captivating Adult Fiction Novels. {'\n'}</Text>
          <Text style={AppStyles.bookstitleSmall}>Explore His Collection Of Fiction Novels, Meticulously Crafted To Offer Enthralling Adventures. With A Talent For Crafting Compelling Narratives, Graydon Invites Readers To Experience Extraordinary Realms Through His Words.</Text>
        </View>
        
        <View style={styles.testimonialsContainer}>
          <Text style={[AppStyles.bookstitleMed , {paddingBottom:hp(3)}]}>What Our Clients Are Saying</Text>
          <Testmonials clientReviews={clientReviews} />
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
  containerTxt: {
    flex: 1,
    paddingHorizontal: hp(3),
    backgroundColor: '#FFFFFF',
  },
  secondaryText: {
    color: AppColors.secondary,
  },
  imgC: {
    padding:hp(1),
    borderWidth:.2,
    borderColor:AppColors.gray300,

    
  },
  aboutImage: {
    width: '99%',
    height: hp(55),
    padding: hp(2),
    resizeMode: 'contain'
  },

  testimonialsContainer: {
    marginTop: hp(4),
    marginBottom: hp(4),
    paddingHorizontal: hp(3),
  },
  
});

export default AboutUsScreen;