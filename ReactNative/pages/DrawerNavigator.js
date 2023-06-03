import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Heading from '../components/Heading';
import Large_Button from '../components/Large_Button';
import SubHeading from '../components/SubHeading';
import ModalComponent from '../components/Modal';

import MainFeedScreen from './MainFeedScreen';
import CreateBook from './CreateScreen';
import DetailScreen from './DetailScreen';
import HistoryScreen from './History';
import EditBookScreen from './EditBookScreen';
import ProfileScreen from './Profile';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
    header: {
      height: 93,
      backgroundColor: '#262A56',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    iconContainer: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    drawerContent: {
      flex: 1,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginLeft: 37,
    },
    rectangularBox: {
      backgroundColor: '#262A56',
      height: 66,
    },
    profileContainer: {
      height: 274,
      backgroundColor: '#262A56',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    userName: {
      color: '#FFF',
      fontSize: 24,
      marginTop: 8,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  });

  const CustomHeader = ({ title, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleMenuPress = () => {
      navigation.openDrawer();
    };
  
    const handleOptionPress = () => {
      setModalVisible(true);
    };
  
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
          <Ionicons name="menu" size={60} color="#FFF" />
        </TouchableOpacity>
        <Heading color="#FFF">{title}</Heading>
        <TouchableOpacity style={styles.iconContainer} onPress={handleOptionPress}>
          <Ionicons name="options" size={60} color="#FFF" />
        </TouchableOpacity>
        {modalVisible && (
          <View style={styles.modalContainer}>
            <ModalComponent visible={modalVisible} setVisible={setModalVisible} />
          </View>
        )}
      </View>
    );
  };

  const CustomDrawerContent = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Fetch user data from Firebase Realtime Database
      const fetchUserData = async () => {
        try {
          const user = firebase.auth().currentUser;
          const snapshot = await firebase.database().ref(`User/${user.uid}`).once('value');
          const data = snapshot.val();
          setUserData(data);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleLogout = () => {
      firebase.auth().signOut().then(() => {
        navigation.navigate('Login');
      }).catch((error) => {
        console.log('Error logging out:', error);
      });
    };
  
    return (
      <View style={styles.drawerContent}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={userData?.profile_pic ? { uri: userData.profile_pic } : require('../assets/defaultpp.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>{userData?.username || 'User Name'}</Text>
        </View>
        <View style={[styles.rectangularBox, { marginTop: 60 }]}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={41.67} color="#FFF" />
            <SubHeading text="Profile" leftPosition={75} color="#fff" isAbsolutePosition={true}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.rectangularBox, { marginTop: 30 }]}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('History')}>
            <Ionicons name="time" size={41.67} color="#FFF" />
            <SubHeading text="Activity" leftPosition={75} color="#fff" isAbsolutePosition={true}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.rectangularBox, { marginTop: 30 }]}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('MainFeed')}>
            <Ionicons name="book" size={41.67} color="#FFF" />
            <SubHeading text="Dashboard" leftPosition={75} color="#fff" isAbsolutePosition={true}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.rectangularBox, { marginTop: 30 }]}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Create')}>
            <Ionicons name="create" size={41.67} color="#FFF" />
            <SubHeading text="Add Books" leftPosition={75} color="#fff" isAbsolutePosition={true}/>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 90 }}>
          <Large_Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName="MainFeed"
        screenOptions={{
          headerShown: true,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: '#000',
        }}
        drawerStyle={{
          backgroundColor: '#FFF',
          width: 240,
        }}
        overlayColor="transparent"
      >
        <Drawer.Screen
          name="MainFeed"
          component={MainFeedScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader title="Book Scout" navigation={navigation} />,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />
            ),
          })}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'profile' : 'profile-outline'} size={size} color={color} />
            ),
          })}
        />
        <Drawer.Screen
          name="Create"
          component={CreateBook}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'create' : 'create-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="EditBook"
          component={EditBookScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'create' : 'create-outline'} size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

export default DrawerNavigator;
