import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { Camera, Permissions } from 'expo';
import { withNavigation } from 'react-navigation';


class RoutesScreen extends React.Component {

    //this is the top bar
    static navigationOptions = {
      header: null
    };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden />
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                buttonStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  width: 60,
                  height: 60,
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 50,
                }}
                title=''
                icon={
                  <Icon
                    name='close'
                    size={30}
                    color='black'
                  />}
                containerStyle={{ marginTop: 20, marginLeft: 20 }}
              />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default withNavigation(RoutesScreen);
