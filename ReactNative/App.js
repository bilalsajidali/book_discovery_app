import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import AboutScreen from './pages/AboutScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/***********/}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
