// // import React, { useState } from "react";
// // import { StyleSheet, View, TouchableOpacity, Text, Image, Platform } from "react-native";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import { AppColors, AppFonts } from "../theme";
// // import GlobalIcon from "../utils/GlobalIcon";
// // import { hp } from "../const";
// // import Vanguards from "../screens/AppScrees/Vanguards";
// // import Webcomic from "../screens/AppScrees/Webcomic";
// // import AboutUsScreen from "../screens/AppScrees/AboutUsScreen";
// // import HomeScreen from "../screens/AppScrees/HomeScreen";
// // import BooksScreen from "../screens/AppScrees/BooksScreen";

// // const setting = createNativeStackNavigator();






// // const BottomTabs: React.FC = () => {
// //     const Tab = createBottomTabNavigator();

// //     return (
// //         <>
// //             <Tab.Navigator
// //                 initialRouteName="Dashboard"
// //                 screenOptions={({ route }) => ({
// //                     tabBarItemStyle: { marginBottom: 10 },
// //                     tabBarStyle: { paddingBottom: 8, height: 70, backgroundColor: AppColors.white, },
// //                     tabBarLabelPosition: 'below-icon',
// //                     tabBarHideOnKeyboard: true,
// //                     tabBarLabelStyle: { fontSize: 12, fontFamily: AppFonts.regular, lineHeight: 14 },
// //                     headerShown: false,
// //                     keyboardHidesTabBar: true,
// //                 })
// //                 }
// //             >
// //                 <Tab.Screen
// //                     name="Vanguards"
// //                     component={Vanguards}
// //                     options={({ route }) => ({
// //                         tabBarShowLabel: true,
// //                         tabBarIcon: ({ focused }) => (
// //                             <View style={{ alignItems: "center", justifyContent: "center" }}>
// //                                 {focused ? (
// //                                     <>
// //                                         <>
// //                                             <GlobalIcon color={AppColors.primary} size={hp(3)} name="dots-grid" library="MaterialCommunityIcons" />
// //                                         </>
// //                                     </>
// //                                 )
// //                                     : (
// //                                         <>
// //                                             <GlobalIcon color={AppColors.white} size={hp(3)} name="dots-grid" library="MaterialCommunityIcons" />
// //                                         </>
// //                                     )
// //                                 }

// //                             </View>
// //                         ),
// //                         tabBarActiveTintColor: '#000'
// //                     })}
// //                 />
// //                 <Tab.Screen
// //                     name="Webcomic"
// //                     component={Webcomic}
// //                     options={{
// //                         tabBarShowLabel: true,
// //                         tabBarIcon: ({ focused }) => (
// //                             <View style={{ alignItems: "center", justifyContent: "center" }}>
// //                                 {focused ? (
// //                                     <>
// //                                         <GlobalIcon color={AppColors.primary} size={hp(3)} name="calendar-month" library="MaterialCommunityIcons" />
// //                                     </>
// //                                 )
// //                                     : (
// //                                         <>
// //                                             <GlobalIcon color={AppColors.white} size={hp(3)} name="calendar-month" library="MaterialCommunityIcons" />
// //                                         </>
// //                                     )
// //                                 }
// //                             </View>
// //                         ),
// //                         tabBarActiveTintColor: '#000'
// //                     }}
// //                 />
// //                 <Tab.Screen
// //                     name="HomeScreen"
// //                     component={HomeScreen}
// //                     options={{
// //                         tabBarShowLabel: true,
// //                         tabBarIcon: ({ focused }) => (
// //                             <View style={{ alignItems: "center", justifyContent: "center" }}>
// //                                 {focused ? (
// //                                     <>
// //                                         <GlobalIcon color={AppColors.primary} size={hp(3)} name="bell-badge" library="MaterialCommunityIcons" />
// //                                     </>
// //                                 )
// //                                     : (
// //                                         <>
// //                                             <GlobalIcon color={AppColors.white} size={hp(3)} name="bell-badge" library="MaterialCommunityIcons" />
// //                                         </>
// //                                     )
// //                                 }
// //                             </View>
// //                         ),
// //                         tabBarActiveTintColor: '#000'
// //                     }}
// //                 />
// //                 <Tab.Screen
// //                     name="AboutUsScreen"
// //                     component={AboutUsScreen}
// //                     options={{
// //                         tabBarShowLabel: true,
// //                         tabBarIcon: ({ focused }) => (
// //                             <View style={{ alignItems: "center", justifyContent: "center" }}>
// //                                 {focused ? (
// //                                     <>
// //                                         <GlobalIcon color={AppColors.primary} size={hp(3)} name="user-circle" library="FontAwesome" />
// //                                     </>
// //                                 )
// //                                     : (
// //                                         <>
// //                                             <GlobalIcon color={AppColors.white} size={hp(3)} name="user-circle" library="FontAwesome" />
// //                                         </>
// //                                     )
// //                                 }

// //                             </View>
// //                         ),
// //                         tabBarActiveTintColor: '#000'
// //                     }}
// //                 />
// //                 <Tab.Screen
// //                     name="BooksScreen"
// //                     component={BooksScreen}
// //                     options={{
// //                         tabBarShowLabel: true,
// //                         tabBarIcon: ({ focused }) => (
// //                             <View style={{ alignItems: "center", justifyContent: "center" }}>
// //                                 {focused ? (
// //                                     <>
// //                                         <GlobalIcon color={AppColors.primary} size={hp(3)} name="user-circle" library="FontAwesome" />
// //                                     </>
// //                                 )
// //                                     : (
// //                                         <>
// //                                             <GlobalIcon color={AppColors.white} size={hp(3)} name="user-circle" library="FontAwesome" />
// //                                         </>
// //                                     )
// //                                 }

// //                             </View>
// //                         ),
// //                         tabBarActiveTintColor: '#000'
// //                     }}
// //                 />


// //             </Tab.Navigator>
// //         </>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     shadow: {

// //         shadowColor: "black",
// //         shadowOffset: {
// //             width: 0,
// //             height: 10,
// //         },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 15.5,
// //         elevation: 5,
// //     },
// //     activeDotStyle: {
// //         padding: 3,
// //         borderRadius: 3,
// //         backgroundColor: 'gray',
// //         marginTop: 10,
// //     },
// // });

// // export default BottomTabs;

// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, TouchableOpacity, Text, Image, Platform, Animated, Keyboard } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import DrawerNavigator from "./DrawerNavigator";
// import AppTab from "../components/app-tabs/app-tabs";
// import Webcomic from "../screens/AppScrees/Webcomic";

// const setting = createNativeStackNavigator();


// const BottomTabs: React.FC = () => { 
    
//     const Tab = createBottomTabNavigator();
//     const Stack = createNativeStackNavigator()

//     const DashBoard = () => {
//         return (
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="Webcomic" component={Webcomic} /> 
//             </Stack.Navigator>
//         );
//     }

//     return ( 
//             <Tab.Navigator
//                 initialRouteName="dashboard" 
//                 screenOptions={{ 
//                     headerShown: false, 
//                     tabBarHideOnKeyboard: true
//                  }}   
//                 // tabBar={(props) => <AppTab {...props} />} 
//                 // tabBar={(props) => (!keyboardShown && <AppTab {...props} />)} 
//             >
//                    <Tab.Screen name="dashboard" component={DashBoard} />  

//             </Tab.Navigator> 
//     );
// };
 
// const styles = StyleSheet.create({ 
// });

// export default BottomTabs;
