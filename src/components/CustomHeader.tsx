// CustomHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, StatusBar, SafeAreaView } from 'react-native';
import GlobalIcon from '../utils/GlobalIcon';
import { AppImages } from '../utils/AppImages';
import { AppColors } from '../theme';

const CustomHeader = ({ navigation, route, onDrawerToggle }: any) => {
  const isHomeScreen = route.name === 'MainTabs'; // Adjust based on your naming

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.primary}
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={onDrawerToggle} style={styles.menuButton}>
              <GlobalIcon library='Ionicons' name="menu-outline" size={24} color={AppColors.white} />
            </TouchableOpacity>
            {isHomeScreen ? (
              <View style={styles.userInfo}>
                <Image 
                  source={AppImages.ch1} // Replace with actual path
                  style={styles.profilePic}
                />
                <Text style={styles.greeting}>Hello Richard!</Text>
              </View>
            ) : (
              <Text style={styles.headerTitle}>{route.name}</Text>
            )}
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <GlobalIcon library='Ionicons' name="notifications-outline" size={24} color={AppColors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <GlobalIcon library='Ionicons' name="cart-outline" size={24} color={AppColors.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton}>
              <GlobalIcon library='Ionicons' name="search" size={20} color="#000080" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.primary,
  },
  header: {
    backgroundColor: AppColors.primary,
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 30, // Adjust padding as needed
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20, // Add this line
    borderBottomRightRadius: 20, // Add this line
    overflow: 'hidden', // Ensures content doesn't overflow the rounded corners
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFC300',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  greeting: {
    color: '#FFC300',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Adjust as needed for spacing
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#FFC300',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default CustomHeader;
