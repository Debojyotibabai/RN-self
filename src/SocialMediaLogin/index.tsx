import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import {googleLogin} from '../utils/sso';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SocialMediaLogin = (): React.JSX.Element => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '581671373005-giuv31lbur528g1lm4ntpgq8tburca3q.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Button title="Google Sign-In" onPress={googleLogin} />
    </View>
  );
};

export default SocialMediaLogin;
