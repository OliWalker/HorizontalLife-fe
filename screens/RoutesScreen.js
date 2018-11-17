import React from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import Colors from '../constants/Colors';


class RoutesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }
  
  static defaultProps = {
    authorized: true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Gym name',
      headerRight: Platform.OS == 'ios'
        ? (
          <Button
            onPress={navigation.getParam('goToImagePicker')}
            title='Add'
            color='white'
            disabled={!navigation.getParam('authorized')}
          />
        ) : null,
      headerStyle: {
        backgroundColor: Platform.OS == 'ios' 
          ? Colors.iosMain : Colors.androidMain,
      },
      headerTintColor: 'white',
    };
  };


  componentDidMount() {
    this.props.navigation.setParams({
      goToImagePicker: this.goToImagePicker,
      authorized: this.props.authorized
    });
  }

  goToImagePicker = () => {
    this.props.navigation.navigate('ImagePicker');
  }


  render() {
    return (
      <View>
        <StatusBar hidden />
        <Text>Routes Screen</Text>
        {Platform.OS == 'android' &&
        <ActionButton
          buttonColor={Colors.androidMain}
          onPress={() => this.goToImagePicker()}
          offsetY={this.state.height - 200}
        />}
      </View>
    );
  }
}

export default withNavigation(RoutesScreen);
