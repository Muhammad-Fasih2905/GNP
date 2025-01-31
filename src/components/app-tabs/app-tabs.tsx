import { Image, TouchableOpacity, View, Text, SafeAreaView, Animated, StyleSheet, Pressable, LayoutAnimation, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import GlobalIcon from '../../utils/GlobalIcon';
import { AppColors } from '../../theme';
import { hp } from '../../const';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
    state?: any,
    descriptors?: any,
    navigation?: any,
}

const AppTab: React.FC<IProps> = ({ state, descriptors, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dotPositions = state?.routes.map(() => new Animated.Value(0));
    const [keyboardShown, setKeyboardShown] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShown(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShown(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        LayoutAnimation.easeInEaseOut();
        Animated.parallel(
            dotPositions.map((dotPosition: any, index: any) => {
                return Animated.spring(dotPosition, {
                    toValue: (activeIndex - index) * 104,
                    useNativeDriver: true,
                });
            })
        ).start();
    }, [activeIndex]);

    return (
        <LinearGradient
            colors={['#001470', '#001EA6', '#001470']}
            style={styles.mainBox}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
        >
            {state?.routes.map((route: any, index: number) => {
                const { icon_name, library } = route?.params;
                const isFocused = state.index === index;

                if (keyboardShown) return <View style={{ borderTopColor: AppColors.primary }} />

                const Icons = () => {
                    const iconSize = index === 2 ? hp(3.5) : hp(2.5);
                    const iconColor = isFocused ? AppColors.secondary : AppColors.white;
                    return <GlobalIcon color={iconColor} size={iconSize} name={icon_name} library={library} />;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => {
                            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                            if (!state.routes[index].state?.isDrawerOpen && !event.defaultPrevented) {
                                setActiveIndex(index);
                                navigation.navigate(route.name);
                            }
                        }}
                        style={index === 2 ? {} : styles.container}
                    >
                        {index === 2 ? (
                            <LinearGradient
                                colors={['#000D44','#001470', '#001EA6', '#001EA6']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={styles.centralContainer}
                            >
                                <View style={styles.tabsBox}>
                                    {Icons()}
                                </View>
                            </LinearGradient>
                        ) : (
                            <View style={styles.tabsBox}>
                                {Icons()}
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </LinearGradient>
    );
};

export default AppTab;

const styles = StyleSheet.create({
    mainBox: {
        flexDirection: 'row',
        borderTopLeftRadius: hp(1.8),
        borderTopRightRadius: hp(1.8),
        height: hp(8),
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
    },
    centralContainer: {
        width: hp(8),
        height: hp(8),
        borderRadius: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 4,
        bottom: hp(3),
        zIndex: 10,
    },
    tabsBox: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
