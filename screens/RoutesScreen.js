import React from 'react';
import { Text, View, Button,} from 'react-native';
import { withNavigation } from 'react-navigation';


class RoutesScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Routes Screen</Text>
        <Button
          title='Go To Image Picker Screen'
          onPress={() => { this.props.navigation.navigate('ImagePicker') }} />
      </View>
    );
  }
}

export default withNavigation(RoutesScreen);
