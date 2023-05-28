import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';
import Form_Label from '../components/Form_Label';
import Large_Form from '../components/Large_Form';
import Large_Button from '../components/Large_Button';
import Normal_Text from '../components/Normal_Text';
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

const defaultProfilePic = require('../assets/defaultpp.png');

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const navigation = useNavigation();

  const handleSignUpPress = () => {
    if (password !== confirmPassword) {
      setRegistrationStatus('passwordMismatch');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userUid = userCredential.user.uid;
        const usersRef = firebase.database().ref('User');
        const newUserRef = usersRef.child(userUid);

        newUserRef
          .set({
            username: name,
            email: email,
            password: password,
            profile_pic: defaultProfilePic,
          })
          .then(() => {
            setRegistrationStatus('success');
            console.log('User registered:', userCredential.user);
            navigation.navigate('Login');
          })
          .catch((error) => {
            setRegistrationStatus('errorWritingData');
            console.log('Error writing user data:', error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setRegistrationStatus('emailAlreadyRegistered');
          console.log('Email already registered');
        } else {
          setRegistrationStatus('registrationError');
          console.log('Registration error:', error.message);
        }
      });
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const renderMessage = () => {
    switch (registrationStatus) {
      case 'success':
        return <Text style={styles.successMessage}>Registration successful!</Text>;
      case 'passwordMismatch':
        return <Text style={styles.errorMessage}>Password mismatch</Text>;
      case 'emailAlreadyRegistered':
        return <Text style={styles.errorMessage}>Email already registered</Text>;
      case 'errorWritingData':
        return <Text style={styles.errorMessage}>Error writing user data</Text>;
      case 'registrationError':
        return <Text style={styles.errorMessage}>Registration error</Text>;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Logo topPosition={74} />

        <Form_Label text="Username" topPosition={252} leftPosition={92} />
        <Large_Form value={name} onChangeText={setName} topPosition={278} />

        <Form_Label text="Email" topPosition={357} leftPosition={92} />
        <Large_Form value={email} onChangeText={setEmail} topPosition={383} />

        <Form_Label text="Password" topPosition={461} leftPosition={92} />
        <Large_Form
          value={password}
          onChangeText={setPassword}
          topPosition={487}
          secureTextEntry
        />

        <Form_Label text="Confirm Password" topPosition={564} leftPosition={92} />
        <Large_Form
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          topPosition={590}
          secureTextEntry
        />

        <Large_Button title="SignUp" topPosition={674} onPress={handleSignUpPress} />

        <Normal_Text text="Already Registered? " topPosition={770} leftPosition={102} absolutePosition={true}/>
        <TouchableOpacity
          style={{ position: 'absolute', top: 766, left: 287 }}
          onPress={handleLoginPress}
        >
          <SubHeading text="Login" color="#262A56" />
        </TouchableOpacity>

        <Circle topPosition={-72} leftPosition={-20} />
        <Circle topPosition={395} leftPosition={270} />
        <Circle topPosition={651} leftPosition={-64} />
        <Circle topPosition={790} leftPosition={282} />

        {renderMessage()}
      </View>
    </ScrollView>
  );
};

const styles = {
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
};

export default SignUpScreen;
