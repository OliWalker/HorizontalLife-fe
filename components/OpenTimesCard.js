import React from 'react';
import { Text, View, Button } from 'react-native';

export default props => (
  <View
    style={{
      width: 300,
      height: 400,
      backgroundColor: 'white',
      position: 'absolute',
      zIndex: 10,
    }}
  >
    <Text>Hi!</Text>
    <Button title="Close" onPress={props.hideCard} />
  </View>
);
