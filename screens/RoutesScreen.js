import React from 'react';
import { Text, View } from 'react-native';

export default class RoutesScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Routes Screen</Text>
      </View>
    );
  }
}
