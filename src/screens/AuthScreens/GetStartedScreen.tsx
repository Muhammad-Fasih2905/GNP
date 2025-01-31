import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import GlobalIcon from '../../utils/GlobalIcon';
import Button from '../../components/AppButton';
import { AppImages } from '../../utils/AppImages';
import { useNavigation } from '@react-navigation/native';
import AppLayout from '../../layouts/AppLayout';
import { AppColors, AppFonts, fontSizes } from '../../theme';
import AuthLayout from '../../layouts/AuthLayout';
import { hp } from '../../const';

const GetStartedScreen = () => {
    const navigation = useNavigation()
    return (
        <AuthLayout backgroundImage={true} statusBarStyle="light-content">
            <View style={styles.container}>
                <Image resizeMode='contain' source={AppImages.logo}  style={styles.logo} />
                <Text style={styles.title}>Let's Talk About Our Stuff</Text>
                <Button
                    title="GET STARTED"
                    onPress={() => navigation.navigate('WelcomeScreen')}
                    fullWidth
                    style={{marginBottom:hp(50), marginTop:hp(3)}}
                />
            </View>
        </AuthLayout>

    );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        // marginBottom: hp(60),
    },
    title: {
        fontSize: fontSizes['1xl'],
        fontFamily: AppFonts.medium,
        color: AppColors.white,
        textAlign: 'center',
        paddingTop: 60,
        // marginBottom: 30,
    },


});