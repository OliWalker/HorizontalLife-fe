import React from 'react';
import { Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { Camera, Permissions, ImagePicker } from 'expo';
import { withNavigation } from 'react-navigation';


class ImagePickerScreen extends React.Component {

    //this is the top bar
    static navigationOptions = {
      header: null
    };

  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: false,
    image: ''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState((state) => {
      return {
        ...state,
        hasCameraPermission: status === 'granted'
      }
    });

    const permissionsCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState((state) => {
      return {
        ...state,
        hasCameraRollPermission: permissionsCameraRoll.status === 'granted'
      }
    });
  }

  takePicture = async () => {
    //eslint-disable-next-line
    if (this.camera) {
      await this.camera.takePictureAsync()
        .then(data => {
          if (data.uri) {
            this.props.navigation.navigate('DrawingScreen', {
              imageUri: data.uri
            });
          }
        })
    }
  };

  pickImage = async () => {
    const { hasCameraRollPermission } = this.state;
    if (hasCameraRollPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'Image'
      });
      if (!result.cancelled) {
        if (result.uri) {
          this.props.navigation.navigate('DrawingScreen', {
            imageUri: result.uri
          });
        }
        this.setState({ image: result.uri });
      }
    }
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
              onPress={() => this.props.navigation.navigate('Routes')}
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
              <TouchableOpacity
                onPress={() => this.pickImage()}
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10
                }}
              >
                <Image
                  source={require('../assets/images/icon-photo-gallery-48-white.png')}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
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

export default withNavigation(ImagePickerScreen);
