import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

const Location = () => {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location.',
            buttonPositive: 'Give',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      await Geolocation.requestAuthorization('whenInUse');
      getLocation();
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View>
      <Text style={{color: 'white'}}>Location</Text>
    </View>
  );
};

export default Location;
