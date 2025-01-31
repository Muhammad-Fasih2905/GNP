import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import GlobalIcon from '../utils/GlobalIcon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/user/userAction';

export const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userSlice.userData); 
  return (
    <View style={styles.container}>
      
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
            <GlobalIcon library='Ionicons' name="close" size={24} color="#000080" />
          </TouchableOpacity>
          <View style={styles.accountHeader}>
            <GlobalIcon library='Ionicons' name="person" size={24} color="#000080" />
            <Text style={styles.accountText}>My account</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} 
        // onPress={()=>{dispatch(logout({user_id:userData.ID}))}}
        >
          <GlobalIcon library='Ionicons' name="log-out-outline" size={24} color="#000080" />
          <Text style={styles.logoutText}>log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
    paddingTop: 0, // Ensure no padding at the top
  },

  header: {
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000080',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#000080',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000080',
  },
});
