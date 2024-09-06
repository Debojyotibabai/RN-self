import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

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

const getFullProfileInfoFromFacebook = () => {
  return new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
      '/me?fields=email,name,first_name,last_name',
      undefined,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  });
};

export const facebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result?.isCancelled) {
      console.log('facebook login cancelled');
    } else {
      const response = await getFullProfileInfoFromFacebook();

      console.log(JSON.stringify(response, null, 4));
    }
  } catch (err) {
    console.log('facebook login err', JSON.stringify(err, null, 4));
  }
};
