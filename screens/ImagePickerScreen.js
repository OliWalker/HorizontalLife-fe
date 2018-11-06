import React from 'react';
import { Text, View, StatusBar, Image } from 'react-native';
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
    image: ''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    console.log('here');
    if (this.camera) {
      await this.camera.takePictureAsync()
        .then(data => {
          this.setState((state) => {
            return {
              ...state,
              image: data.uri
            }
          })
        })
    }
    console.log(this.state);
  };

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

          <Camera
            style={{ flex: 1,  justifyContent: 'space-between'}}
            type={this.state.type}
            ref={ref => { this.camera = ref }}
          >
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
            <View
              style={{
                flex: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/images/icon-photo-gallery-48-white.png')}
                style={{
                  height: 40,
                  width: 40,
                  position: 'absolute',
                  left: 10,
                  bottom: 10
                }}
              />
              <Button
                onPress={() => this.takePicture()}
                buttonStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  width: 60,
                  height: 60,
                  borderColor: 'rgba(255, 255, 255, 1)',
                  borderWidth: 6,
                  borderRadius: 50,
                }}
                title=''
              >
              </Button>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default withNavigation(RoutesScreen);
