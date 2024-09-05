import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(JSON.stringify(userInfo, null, 4));

    return userInfo;
  } catch (err) {
    console.log('google login err', JSON.stringify(err, null, 4));
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (err) {
    console.log('google sign out err', JSON.stringify(err, null, 4));
  }
};
