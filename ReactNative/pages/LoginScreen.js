import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Large_Form from '../components/Large_Form';
import Password_Form from '../components/Password_Form';
import Form_Label from '../components/Form_Label'
import Normal_Text from '../components/Normal_Text';
import Logo from '../components/Logo';
import Large_Button from '../components/Large_Button';
import SubHeading from '../components/SubHeading';
import Circle from '../components/Circle';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Firebase configuration object
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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleForgetPassword = () => {
    navigation.navigate('ResetPassword'); 
  };

  const handleLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        // Clear the form and error message
        setEmail('');
        setPassword('');
        setErrorMessage(''); 
        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage('Incorrect email or password');
      });
  };
  
  
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Logo topPosition={105} />

        <Normal_Text
          text="Your Personalized Literary Journey"
          topPosition={300}
          absolutePosition={true}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <Form_Label text="Email" topPosition={404}  />
        <Large_Form value={email} onChangeText={setEmail} topPosition={430} />

        <Form_Label text="Password" topPosition={513}  />
        <Password_Form value={password} onChangeText={setPassword} topPosition={538} />

        <Large_Button title="Login" topPosition={621} onPress={handleLoginPress} />

        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', fontWeight: 'bold', color: '#262A56', position: 'absolute', top: errorMessage ? 332 : 480, alignSelf: 'center', width: 200, textAlign: 'center' }}>
            {"Forget Password?"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', position: 'absolute', top: 755, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Regular', }}>
            {"Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', fontWeight: 'bold', color: '#262A56', marginLeft:3 }}>
              {"SignUp"}
            </Text>
          </TouchableOpacity>
        </View>


        <Circle topPosition={-39} leftPosition={0}></Circle>
        <Circle topPosition={395} leftPosition={270}></Circle>
        <Circle topPosition={651} leftPosition={-64}></Circle>
        <Circle topPosition={790} leftPosition={282}></Circle>
      </View>
  );
};

const styles = {
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 130,
  },
};

export default LoginScreen;
