import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { AppColors, AppFonts, AppRadius } from '../../theme';
import { hp, wp } from '../../const';
import GlobalIcon from '../../utils/GlobalIcon';

import { AppImages } from '../../utils/AppImages';
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../../styles/AppStyles';

const Notifications = () => {
    const navigation = useNavigation()
    const notifications = [
        { id: 1, userImage: AppImages.ch1, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
        { id: 2, userImage: AppImages.ch2, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
        { id: 3, userImage: AppImages.ch3, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
        { id: 4, userImage: AppImages.ch1, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
        { id: 5, userImage: AppImages.ch1, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
        { id: 6, userImage: AppImages.ch3, message: 'Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Ut.', date: 'May 22, 2024', timeAgo: '10 m ago' },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <GlobalIcon name={'arrowleft'} library='AntDesign' color={AppColors.black} size={hp(2.5)} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <GlobalIcon color={AppColors.black} size={hp(2.5)} name={'search'} library={'Ionicons'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.sectionTitle}>Today</Text>
                {notifications.map(notification => (
                    <View key={notification.id} style={styles.notificationItem}>
                        <Image source={notification.userImage} style={styles.userImage} />
                        <View style={styles.notificationTextContainer}>
                            <Text style={AppStyles.bookstitleSmall}>{notification.message}</Text>
                            <View style={AppStyles.rowBetween}>
                                <Text style={styles.notificationDate}>{notification.date}</Text>
                                <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default Notifications;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: AppColors.white,
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.secondary,
        width: 40,
        height: 40,
        borderRadius: AppRadius.sm,

        zIndex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        paddingVertical: hp(5),
        backgroundColor: '#EEEEEE',
        borderBottomLeftRadius: hp(2),
        borderBottomRightRadius: hp(2),
    },
    iconButton: {
        padding: hp(1),
    },
    headerTitle: {
        fontSize: hp(2.7),
        left: hp(-4),
        color: AppColors.black,
        fontFamily: AppFonts.medium,
    },
    contentContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
    },
    sectionTitle: {
        fontSize: hp(2),
        fontWeight: 'bold',
        color: AppColors.black,
        marginBottom: hp(2),
        fontFamily: AppFonts.medium,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: AppColors.gray400,
    },
    userImage: {
        width: hp(7),
        height: hp(7),
        borderRadius: hp(.5),
        marginRight: wp(3),
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationMessage: {
        fontSize: hp(1.8),
        color: AppColors.black,
        marginBottom: hp(0.5),
        fontFamily: AppFonts.regular,
    },
    notificationDate: {
        fontSize: hp(1.5),
        color: AppColors.gray700,
        fontFamily: AppFonts.light,
    },
    timeAgo: {
        fontSize: hp(1.5),
        color: AppColors.gray700,
        fontFamily: AppFonts.light,
    },
});