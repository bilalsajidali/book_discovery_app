import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Large_Form from '../components/Large_Form';
import Large_Button from '../components/Large_Button';
import Circle from '../components/Circle';
import Form_Label from '../components/Form_Label';
import GoBack from '../components/GoBack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
        navigation.navigate('Login'); 
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error.message);
        setErrorMessage('Error sending password reset email');
      });
  };

  return (
    <View style={styles.outerContainer}>
      <GoBack />
      <View style={styles.container}>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <Form_Label text="Email" topPosition={405} leftPosition={92} />
        <Large_Form value={email} onChangeText={setEmail} topPosition={430} />

        <TouchableOpacity onPress={handleResetPassword}>
          <Large_Button title="Reset Password" topPosition={515} />
        </TouchableOpacity>
      </View>
      <Circle topPosition={100} leftPosition={0}></Circle>
        <Circle topPosition={395} leftPosition={270}></Circle>
        <Circle topPosition={651} leftPosition={-64}></Circle>
        <Circle topPosition={790} leftPosition={282}></Circle>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default ResetPasswordScreen;
