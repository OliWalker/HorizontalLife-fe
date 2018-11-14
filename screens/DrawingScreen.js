import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button
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
    undoCircle: '',
    isSVGDoneToggle: false,
    drawing: {
      type: '',
      svg: ''
    }
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
    console.log('is called')
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
      const { color } = this.state;
      const { imageUri } = this.props.navigation.state.params;
      const { type, svg } = this.state.drawing;
      this.props.navigation.navigate('UploadRouteScreen', {
        imageUri,
        color,
        type,
        svg
      })
    }
  }

  render() {
    const { imageUri } = this.props.navigation.state.params;
    const { isSVGDoneToggle } = this.state;
    // console.log(this.state, '---------------')

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
            getSVG={this.getSVG}
            svgDone={isSVGDoneToggle}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                position: 'absolute',
                height: Dimensions.get('window').height-120,
                width: Dimensions.get('window').width,
              }}>
            </Image>
            <Button
              style={{
                // position: 'absolute',
                backgroundColor: 'white',
                marginTop: 30,
                marginRight: 30,
                width: 100,
                height: 30,
              }}
              onPress={() => this.handleDoneButton()}
              title='Done'
            />
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
