import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Large_Form from '../components/Large_Form';
import Form_Label from '../components/Form_Label'
import Password_Form from '../components/Password_Form';
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
        navigation.navigate('Create');
      })
      .catch((error) => {
        setErrorMessage('Incorrect email or password');
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Logo topPosition={105} />

        <Normal_Text
          text="Your Personalized Literary Journey"
          topPosition={310}
          leftPosition={59}
          absolutePosition={true}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <Form_Label text="Email" topPosition={404} leftPosition={92} />
        <Large_Form value={email} onChangeText={setEmail} topPosition={430} />

        <Form_Label text="Password" topPosition={513} leftPosition={92} />
        <Password_Form value={password} onChangeText={setPassword} topPosition={538} />

        <Large_Button title="Login" topPosition={621} onPress={handleLoginPress} />

        TouchableOpacity onPress={handleForgetPassword}>
        <SubHeading text="Forget Password?" topPosition={482} leftPosition={136} color="#262A56"/>
        </TouchableOpacity>

        <Normal_Text text="Don't have an account? " topPosition={766} leftPosition={67} absolutePosition={true}/>
        <TouchableOpacity style={{ position: 'absolute', top: 766, left: 282 }} onPress={handleSignUpPress}>
          <SubHeading text="SignUp" color="#262A56" />
        </TouchableOpacity>

        <Circle topPosition={-39} leftPosition={0}></Circle>
        <Circle topPosition={395} leftPosition={270}></Circle>
        <Circle topPosition={651} leftPosition={-64}></Circle>
        <Circle topPosition={790} leftPosition={282}></Circle>
      </View>
    </ScrollView>
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
