import React, { useState } from 'react';
import { View } from 'react-native';
import Large_Form from '../components/Large_Form';
import Form_Label from '../components/Form_Label'
import Normal_Text from '../components/Normal_Text';
import Logo from '../components/Logo';
import Large_Button from '../components/Large_Button';
import SubHeading from '../components/SubHeading';
import Circle from '../components/Circle';

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View>
        <Logo topPosition={105} />

        <Normal_Text
            text="Your Personalized Literary Journey"
            topPosition={295}
            leftPosition={59}
        />

        <Form_Label text="Email" topPosition={404} leftPosition={92} />
        <Large_Form value={name} onChangeText={setName} topPosition={430} />

        <Form_Label text="Password" topPosition={513} leftPosition={92} />
        <Large_Form value={name} onChangeText={setName} topPosition={538} />

        <Large_Button title="Login" topPosition={621} />

        <SubHeading
            text="Forget Password?"
            topPosition={699}
            leftPosition={136}
            color="#262A56"
        />

        <Normal_Text
            text="Don't have an account? "
            topPosition={766}
            leftPosition={67}
        />
        <SubHeading
            text="SignUp"
            topPosition={766}
            leftPosition={238}
            color="#262A56"
        />

        <Circle topPosition={-39} leftPosition={0}></Circle>
        <Circle topPosition={395} leftPosition={270}> </Circle>
        <Circle topPosition={651} leftPosition={-64}> </Circle>
        <Circle topPosition={-39} leftPosition={0}> </Circle>

    </View>
  );
};

export default LoginScreen;
