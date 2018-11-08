import React from 'react';
import { View, StatusBar, Image, Dimensions, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Svg } from 'expo';

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

class DrawingLayer extends React.Component {
  static defaultProps = {
    onPress: () => null,
    numberOfTouches: 1,
  }

  state = {
    points: []
  }

  onStartShouldSetResponder = (evt) => {
    if (evt.nativeEvent.touches.length === this.props.numberOfTouches) {
      return true;
    }

    return false;
  }

  onResponderRelease = (evt) => {
    const point = {
      x: evt.nativeEvent.locationX,
      y: evt.nativeEvent.locationY,
      timestamp: evt.nativeEvent.timestamp
    }
    this.setState((state) => {
      return {
        points: [
          ...state.points,
          point
        ]
      }
    })
    this.props.onPress();
  }

  renderCircle = () => {
    const { points } = this.state;
    if (points.length > 0) {
      const sth = points.map(point =>
        <Svg.Circle
          key={point.timestamp}
          cx={point.x}
          cy={point.y}
          r={25}
          strokeWidth={2.5}
          stroke="yellow"
          fill="white"
          fillOpacity={0}
        />
      )
      return sth
    }
  }
  render() {
    return (
      <View
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
        style={{
          height: Dimensions.get('window').height-120,
          width: Dimensions.get('window').width
        }}
      >
        {this.props.children}
        <Svg
          height={Dimensions.get('window').height-120}
          width={Dimensions.get('window').width}
        >
          {this.renderCircle()}
        </Svg>
      </View>
    );
  }
}

class DrawingScreen extends React.Component {

    //this is the top bar
    static navigationOptions = {
      header: null
    };

  state = {
    image: '',
    circleMode: false
  };

  render() {
    const { imageUri } = this.props.navigation.state.params;
    if (imageUri) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          {Dimensions.get('window') &&
          <DrawingLayer
            onPress={() => console.log('happening!')} //eslint-disable-line
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
                if (this.state.circleMode) {
                  this.setState((state) => {
                    return {
                      ...state,
                      circleMode: !state.circleMode
                    }
                  })
                }
                console.log('drawing line', 'circleMode->',this.state.circleMode) //eslint-disable-line
              }}
            />
            <Button
              title='ColorPicker'
              onPress={() => console.log('color picker')} //eslint-disable-line
            />
            <Button
              title='Circle oOo'
              onPress={() => {
                if (!this.state.circleMode) {
                  this.setState((state) => {
                    return {
                      ...state,
                      circleMode: !state.circleMode
                    }
                  })
                }
                console.log('putting circles', 'circleMode->',this.state.circleMode) //eslint-disable-line
              }}
            />

          </View>
        </View>
      );
    }

  }
}


export default withNavigation(DrawingScreen);
