import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

import ColorWheel from '../components/ColorWheel';
import DrawingLayer from '../components/DrawingLayer';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container_bottom: {
    flex: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    height: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class DrawingScreen extends React.Component {

    //this is the top bar
    static navigationOptions = {
      header: null
    };

  state = {
    image: '',
    isCircleMode: false,
    color: 'yellow',
    undoCircle: ''
  };

  getColor = (color) => {
    this.setState((state) => {
      return {
        ...state,
        color
      }
    })
  }

  render() {
    const { imageUri } = this.props.navigation.state.params;
    if (imageUri) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          {Dimensions.get('window') &&
          <DrawingLayer
            isCircleMode={this.state.isCircleMode}
            color={this.state.color}
            height={Dimensions.get('window').height-120}
            width={Dimensions.get('window').width}
            undoCircle={this.state.undoCircle}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                position: 'absolute',
                height: Dimensions.get('window').height-120,
                width: Dimensions.get('window').width,
              }}>
            </Image>
          </DrawingLayer>
          }
          <View
            style={styles.container_bottom}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.isCircleMode) {
                  this.setState((state) => {
                    return {
                      ...state,
                      isCircleMode: !state.isCircleMode
                    }
                  })
                }
              }}
            >
              <Image
                source={require('../assets/images/pen-80.png')}
                style={{
                  height: 70,
                  width: 70
                }}
              />
            </TouchableOpacity>
            <ColorWheel
              size={110}
              colorArray={['orange', 'red', 'hotpink', 'purple', 'blue', 'lightskyblue', 'springgreen', 'yellow']}
              getColor={this.getColor}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.isCircleMode) {
                    this.setState((state) => {
                      return {
                        ...state,
                        undoCircle: Date.now()
                      }
                    })
                  }
                }}
              >
                <Image
                  source={require('../assets/images/undo-80.png')}
                  style={{
                    height: 25,
                    width: 25,
                    position: 'absolute',
                    top: -15,
                    right: -15
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!this.state.isCircleMode) {
                    this.setState((state) => {
                      return {
                        ...state,
                        isCircleMode: !state.isCircleMode
                      }
                    })
                  }
                }}
              >
                <Image
                  source={require('../assets/images/circle-blue-100.png')}
                  style={{
                    height: 70,
                    width: 70
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

  }
}


export default withNavigation(DrawingScreen);
