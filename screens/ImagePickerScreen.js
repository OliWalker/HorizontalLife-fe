import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Camera, Permissions, ImagePicker } from 'expo';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container_button_back: {
    marginTop: 20,
    marginLeft: 20
  },
  button_back: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: 60,
    height: 60,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 50,
  },
  container_bottom: {
    flex: 0,
    backgroundColor: 'black',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container_touchable_image: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  image_photo_gallery: {
    height: 40,
    width: 40
  },
  button_camera: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: 60,
    height: 60,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 6,
    borderRadius: 50,
  }
});

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
      };
    });

    const permissionsCameraRoll = await Permissions
      .askAsync(Permissions.CAMERA_ROLL);
    this.setState((state) => {
      return {
        ...state,
        hasCameraRollPermission: permissionsCameraRoll.status === 'granted'
      };
    });
  }

  takePicture = async () => {
    if (this.camera) {
      await this.camera.takePictureAsync()
        .then((data) => {
          if (data.uri) {
            this.props.navigation.navigate('DrawingScreen', {
              imageUri: data.uri,
              height: data.height,
              width: data.width
            });
          }
        });
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
            imageUri: result.uri,
            height: result.height,
            width: result.width
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
        <View style={styles.container}>
          <StatusBar hidden />

          <Camera
            style={{
              ...styles.camera,
              height: Dimensions.get('window').height - 120,
            }}
            type={this.state.type}
            ref={ref => this.camera = ref }
          >
            <Button
              onPress={() => this.props.navigation.navigate('Routes')}
              buttonStyle={styles.button_back}
              title=''
              icon={
                <Icon
                  name='close'
                  size={30}
                  color='black'
                />}
              containerStyle={styles.container_button_back}
            />
            <View
              style={styles.container_bottom}>
              <TouchableOpacity
                onPress={() => this.pickImage()}
                style={styles.container_touchable_image}
              >
                <Image
                  source={require(
                    '../assets/images/icon-photo-gallery-48-white.png')}
                  style={styles.image_photo_gallery}
                />
              </TouchableOpacity>
              <Button
                onPress={() => this.takePicture()}
                buttonStyle={styles.button_camera}
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
