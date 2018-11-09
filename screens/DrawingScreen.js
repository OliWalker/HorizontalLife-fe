import React from 'react';
import { View, StatusBar, Image, Dimensions, Button, StyleSheet } from 'react-native';
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
    justifyContent: 'space-between',
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
    color: 'yellow'
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
            <Button
              onPress={() => this.props.navigation.goBack()}
              title='goBack'
            />
            <Button
              title='Line /|/'
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
            />
            <ColorWheel
              size={100}
              colorArray={['orange', 'red', 'hotpink', 'purple', 'blue', 'lightskyblue', 'springgreen', 'yellow']}
              getColor={this.getColor}
            />
            <Button
              title='Circle oOo'
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
            />
          </View>
        </View>
      );
    }

  }
}


export default withNavigation(DrawingScreen);
