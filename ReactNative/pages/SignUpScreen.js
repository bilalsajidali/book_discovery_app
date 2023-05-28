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

const defaultProfilePic = require('../assets/defaultpp.png');

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
        <Large_Form value={name} onChangeText={} topPosition={278} />

        <Form_Label text="Email" topPosition={357} leftPosition={92} />
        <Large_Form value={email} onChangeText={} topPosition={383} />

        <Form_Label text="Password" topPosition={461} leftPosition={92} />
        <Large_Form
          value={password}
          onChangeText={}
          topPosition={487}
          secureTextEntry
        />

        <Form_Label text="Confirm Password" topPosition={564} leftPosition={92} />
        <Large_Form
          value={confirmPassword}
          onChangeText={}
          topPosition={590}
          secureTextEntry
        />

        <Large_Button title="SignUp" topPosition={674} onPress={} />

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


export default SignUpScreen;
