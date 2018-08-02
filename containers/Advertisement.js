import React from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


class Advertisement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  

  render() {
    return (
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-8449515535169200/8525806566" // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
        onDidFailToReceiveAdWithError={() => { }} />
    )
  }
}

export default Advertisement;
