import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppImages } from '../utils/AppImages';
import AppStyles from '../styles/AppStyles';
import { AppColors, fontSizes } from '../theme';
import { hp } from '../const';
import { clientReviewsTypes } from '../store/product/productSlice';


// const testimonials = [
//   {
//     id: '01',
//     name: 'Nancy A. Mitchell',
//     text: "I'm Always in Awe of Graydon Navarre's Talent. Whether It's His Captivating Books or Mesmerizing Book Covers, He's Truly A Gifted Artist. Can't Wait To See More!",
//     image: AppImages.ch2
//   },
//   {
//     id: '02',
//     name: 'Rachel J. Ph',
//     text: "I've Never Been So Moved By Words. Graydon Navarre's Books Speak Volumes, Each Page A Beautiful Tapestry of Emotion.",
//     image: AppImages.ch1
//   },
// ];

export interface TestmonialsTypes {
  clientReviews: clientReviewsTypes[]
}
export interface TestimonialItemTypes {
  item: clientReviewsTypes;
}

const Testmonials: React.FC<TestmonialsTypes> = ({ clientReviews }) => {

  const TestimonialItem: React.FC<TestimonialItemTypes> = ({ item }: { item: clientReviewsTypes }) => (
    <View style={styles.testimonialItem}>
      <Text style={styles.testimonialText}>{item.content}</Text>
      <View style={styles.testimonialAuthor}>
        <Image source={{ uri: item.featured_image }} style={styles.authorImage} />
        <Text style={styles.authorName}>{item.title}</Text>
      </View>
    </View>
  );


  return (
    <FlatList
      data={clientReviews}
      renderItem={({ item }: { item: clientReviewsTypes }) => <TestimonialItem item={item} />}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
       snapToAlignment="center"
    />
  )
}

export default Testmonials

const styles = StyleSheet.create({
  testimonialsContainer: {
    marginTop: hp(4),
    marginBottom: hp(4),
    paddingHorizontal: hp(3),
  },
  testimonialsTitle: {
    ...AppStyles.bookstitle,
    marginBottom: hp(2),
  },
  testimonialItem: {
    width: hp(40),
    backgroundColor: AppColors.black,
    borderRadius: hp(2),
    padding: hp(2),
    marginRight: hp(2),
  },
  testimonialText: {
    ...AppStyles.bookstitleSmall,
    color: AppColors.gray600,
    marginBottom: hp(2),
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: hp(1),
  },
  authorName: {
    fontSize: fontSizes.sm,
    color: AppColors.secondary
  },
})