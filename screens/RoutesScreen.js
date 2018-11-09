import React from 'react';
import { Text, View, Button,} from 'react-native';
import { withNavigation } from 'react-navigation';
import ColorWheel from '../components/ColorWheel';


class RoutesScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Routes Screen</Text>
        <ColorWheel>

        </ColorWheel>
        {/* <Button
          title='Go To Image Picker Screen'
          onPress={() => { this.props.navigation.navigate('ImagePicker') }} /> */}
      </View>
    );
  }
}

export default withNavigation(RoutesScreen);
