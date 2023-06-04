import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import GoBack from '../components/GoBack';
import Circle from '../components/Circle';
import SubHeading from '../components/SubHeading';
import Password_Form from '../components/Large_Form';
import Form_Label from '../components/Form_Label';
import Large_Button from '../components/Large_Button';
import SwitchToggle from 'react-native-switch-toggle';
import { useNavigation } from '@react-navigation/native';

// Initialize Firebase
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

const ProfileScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  

  const handleToggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate('Login'); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handlePasswordChange = () => {
    if (password === confirmPassword) {
      // Passwords match, proceed with password change
      const user = firebase.auth().currentUser;
      if (user) {
        user.updatePassword(password)
          .then(() => {
            // Password updated successfully
            setPassword('');
            setConfirmPassword('');
            setErrorMessage('');
          })
          .catch((error) => {
            // Error occurred while updating password
            setErrorMessage(error.message);
          });
      }
    } else {
      // Passwords do not match, show error message
      setErrorMessage('Passwords do not match');
    }
  };
  
  

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const ref = firebase.database().ref('User/' + user.uid);
      ref.once('value').then((snapshot) => {
        const userData = snapshot.val();
        const url = userData.profile_pic;
        const name = userData.username;
        setImageUrl(url);
        setUsername(name);
      });
    }
  }, []);

  const handleProfilePicClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const user = firebase.auth().currentUser;
      if (user) {
        const ref = firebase.database().ref('User/' + user.uid);
        ref.update({
          profile_pic: result.uri,
        });
        setImageUrl(result.uri);
      }
    }
  };

  return (
    <View>
      <GoBack />
      <View style={styles.container}>
        <Circle topPosition={55} leftPosition={-35} />
        <Circle topPosition={387} leftPosition={-86} />
        <Circle topPosition={412} leftPosition={275} />
        <Circle topPosition={703} leftPosition={195} />

        <TouchableOpacity onPress={handleProfilePicClick}>
          <Image
            source={imageUrl ? { uri: imageUrl } : null}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        <SubHeading text={username} topPosition={225} color="#000" isAbsolutePosition={true}/>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Form_Label text="Change Password" topPosition={286} leftPosition={92} />
        <Password_Form topPosition={311} value={password} onChangeText={setPassword}/>

        <Form_Label text="Confirm Password" topPosition={394} leftPosition={92} />
        <Password_Form topPosition={419} value={confirmPassword} onChangeText={setConfirmPassword}/>

        <Large_Button title="Change Password" topPosition={501} onPress={handlePasswordChange}/>

        <View style={styles.notificationContainer}>
          <SubHeading text="Daily Notification" color="#000" isAbsolutePosition={false}/>
          <SwitchToggle
            switchOn={notificationEnabled}
            onPress={handleToggleNotification}
            backgroundColorOn="#262A56"
            backgroundColorOff="#D9D9D9"
            circleColor="#fff"
            duration={300}
          />
        </View>

        <SubHeading text="Privacy Policy" topPosition={635} color="#000" isAbsolutePosition={true}/>

        <Large_Button title="Log Out" topPosition={680} onPress={handleLogout} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 130,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%', 
    paddingLeft: 92,
    marginTop: 380,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  }
});

export default ProfileScreen;
