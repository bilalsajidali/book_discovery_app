import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import ResetPasswordScreen from './pages/ResetPassword';
import DetailScreen from './pages/DetailScreen';
import EditBookScreen from './pages/EditBookScreen';
import HorrorScreen from './pages/HorrorScreen';
import FantasyScreen from './pages/Fantasy';
import MysteryScreen from './pages/Mystery';
import AdventureScreen from './pages/Adventure';
import RomanceScreen from './pages/Romance';
import Rating_High_To_Low from './pages/Rating_High_To_Low';
import Rating_Low_To_High from './pages/Rating_Low_To_High';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import DrawerNavigator from './pages/DrawerNavigator';  

const firebaseConfig = {
  apiKey: "AIzaSyB874SwK2FLGOf3PTtDbmAmUEDwCmejqH4",
  authDomain: "bookdiscoveryapp.firebaseapp.com",
  databaseURL: "https://bookdiscoveryapp-default-rtdb.firebaseio.com",
  projectId: "bookdiscoveryapp",
  storageBucket: "bookdiscoveryapp.appspot.com",
  messagingSenderId: "224686141258",
  appId: "1:224686141258:web:4228c07458829be9f25bb3",
  measurementId: "G-0CTY4WGY2C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="EditBook" component={EditBookScreen} />
        <Stack.Screen name="Horror" component={HorrorScreen} />
        <Stack.Screen name="Fantasy" component={FantasyScreen} />
        <Stack.Screen name="Mystery" component={MysteryScreen} />
        <Stack.Screen name="Adventure" component={AdventureScreen} />
        <Stack.Screen name="Romance" component={RomanceScreen} />
        <Stack.Screen name="RatingHtoL" component={Rating_High_To_Low} />
        <Stack.Screen name="RatingLtoH" component={Rating_Low_To_High} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
