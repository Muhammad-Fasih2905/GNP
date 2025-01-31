import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/AppButton';
import { AppImages } from '../../utils/AppImages';
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../../styles/AppStyles';
import { hp } from '../../const';
import { AppColors } from '../../theme';
import AuthLayout from '../../layouts/AuthLayout';

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation()

    return (
      
            <View style={styles.background}>
                <Image source={AppImages.ch3} style={styles.bookCover} />
                <View style={styles.container}>
                    <Text style={AppStyles.authTitle}>Hello</Text>
                    <Text style={[AppStyles.authSubTitle, { marginVertical: hp(2) }]}>Welcome to Little Drop, where you manage your daily tasks</Text>
                    <Button fullWidth title="LOGIN" onPress={() => { navigation.navigate('LoginScreen') }} />
                    <Button variant='secondary' fullWidth title="SIGN UP" onPress={() => { navigation.navigate('SignUpScreen') }} style={styles.signUpButton} />
                    <Text style={AppStyles.authSubTitle}>Sign up using</Text>
                    <View style={styles.socialIcons}>
                        {/* Add social icons here */}
                    </View>
                </View>
            </View>
       
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: AppColors.primary,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(8),
    },
    bookCover: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    signUpButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: AppColors.white,
        marginVertical: hp(3)
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 10,
    },
});

export default WelcomeScreen;