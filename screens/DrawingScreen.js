import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text
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
    flexDirection: 'row',
  },
  button_done: {
    position: 'absolute',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
    width: 100,
    height: 40,
    borderRadius: 50
  },
  text_button_done: {
    fontSize: 25,
    color: '#007AFF'
  }
});

class DrawingScreen extends React.Component {

  //this is the top bar
  static navigationOptions = {
    header: null
  };

  constructor (props) {
    super(props);
    this.state = {
      image: '',
      svg_height: Dimensions.get('window').height - 120,
      svg_width: Dimensions.get('window').width,
      isCircleMode: false,
      color: 'yellow',
      undoCircle: '',
      isSVGDoneToggle: false,
      drawing: {
        type: '',
        svg: ''
      }
    }
  }

  state = {
    
  };

  getColor = (color) => {
    this.setState((state) => {
      return {
        ...state,
        color
      }
    })
  }

  getSVG = (type, svg) => {
    this.setState((state) => {
      return {
        ...state,
        drawing: {
          type,
          svg
        }
      } 
    })
  }

  handleDoneButton = async () => {
    this.setState((state) => {
      return {
        ...state,
        isSVGDoneToggle: !this.state.isSVGDoneToggle
      }
    })

  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.drawing.svg !== this.state.drawing.svg) {
      const { color, svg_height, svg_width } = this.state;
      const { imageUri, width, height } = this.props.navigation.state.params;
      const { type, svg } = this.state.drawing;
      this.props.navigation.navigate('UploadRouteScreen', {
        imageUri,
        width,
        height,
        color,
        type,
        svg,
        svg_height,
        svg_width
      })
    }
  }

  render() {
    const { imageUri } = this.props.navigation.state.params;
    const { isSVGDoneToggle, svg_height, svg_width } = this.state;

    if (imageUri) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          {svg_height &&
          <DrawingLayer
            isCircleMode={this.state.isCircleMode}
            color={this.state.color}
            height={svg_height}
            width={svg_width}
            undoCircle={this.state.undoCircle}
            getSVG={this.getSVG}
            svgDone={isSVGDoneToggle}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                position: 'absolute',
                height: svg_height,
                width: svg_width,
              }}>
            </Image>
          </DrawingLayer>
          }
          <TouchableOpacity
            style={styles.button_done}
            onPress={() => this.handleDoneButton()}
          >
            <Text
              style={styles.text_button_done}
            >
              Done
            </Text>
          </TouchableOpacity>
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
              colorArray={['red', 'hotpink', 'blue', 'springgreen', 'yellow']}
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
