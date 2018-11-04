import React from 'react';
import { View, Text } from 'react-native';

export default class UnusedScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Unused Screen</Text>
      </View>
    );
  }
}
