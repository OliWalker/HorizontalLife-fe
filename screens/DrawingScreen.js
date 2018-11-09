import React from 'react';
import { View, StatusBar, Image, Dimensions, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Svg } from 'expo';

import ColorWheel from '../components/ColorWheel';

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
    points: [],
    strokeWidth: 2.5,
    radius: 25,
    //One straight line option
    // line: {
    //   x1: null,
    //   y1: null,
    //   x2: null,
    //   y2: null,
    // },
    linePath: '',
    linePoints: []
  }

  onStartShouldSetResponder = (evt) => {
    if (evt.nativeEvent.touches.length === this.props.numberOfTouches) {
      return true;
    }

    return false;
  }

  onResponderRelease = (evt) => {
    if (this.props.isCircleMode) {
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
    }
    this.props.onPress();
  }

  onResponderMove = (evt) => {
    console.log('move');
    const x2 = evt.nativeEvent.locationX;
    const y2 = evt.nativeEvent.locationY;
    const { x, y } = this.state.linePoints[this.state.linePoints.length - 1];

    const controlPointStartX = x;
    const controlPointStartY = y;

    const controlPointEndX = x2;
    const controlPointEndY = y2;

    const line = ` C ${controlPointStartX} ${controlPointStartY}, ${controlPointEndX} ${controlPointEndY}, ${x2} ${y2}`

    this.setState((state) => {
      return {
        ...state,
        linePath: state.linePath + line,
        linePoints: [
          ...state.linePoints,
          { x: x2, y: y2}
        ]
      }
    })
    //One straight line option
    // this.setState((state) => {
    //   return {
    //     ...state,
    //     line: {
    //       ...state.line,
    //       x2,
    //       y2
    //     }
    //   }
    // })

  }

  onResponderGrant = (evt) => {
    console.log('start');
    const x = evt.nativeEvent.locationX;
    const y = evt.nativeEvent.locationY;
    const startPoint = `M${x} ${y}`;
    this.setState((state) => {
      return {
        ...state,
        linePath: startPoint,
        linePoints: [ { x, y } ]
      }
    })

    //One straight line option
    // this.setState((state) => {
    //   return {
    //     ...state,
    //     line: {
    //       x1,
    //       y1
    //     }
    //   }
    // })
  }

  renderCircle = () => {
    const { points, strokeWidth, radius } = this.state;
    const { color } = this.props;
    if (points.length > 0) {
      const circles = points.map(point =>
        <Svg.Circle
          key={point.timestamp}
          cx={point.x}
          cy={point.y}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="white"
          fillOpacity={0}
        />
      )
      return circles
    }
  }

  renderLine = () => {
    console.log('Happening');
    //One straight line option
    // const { x1, y1, x2, y2 } = this.state.line;
    const { strokeWidth, linePath } = this.state;
    const { color } = this.props;
    if (linePath) {
      return (
        <Svg.Path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      )
    }
  }

  render() {
    return (
      <View
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
        onResponderMove={this.onResponderMove}
        onResponderGrant={this.onResponderGrant}
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
          {
            this.props.isCircleMode ?
              this.renderCircle()
              : this.renderLine()
          }

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
            // onPress={() => console.log('happening!')} //eslint-disable-line
            isCircleMode={this.state.isCircleMode}
            color={this.state.color}
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
                console.log('drawing line', 'isCircleMode->',this.state.isCircleMode) //eslint-disable-line
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
                console.log('putting circles', 'isCircleMode->',this.state.isCircleMode) //eslint-disable-line
              }}
            />

          </View>
        </View>
      );
    }

  }
}


export default withNavigation(DrawingScreen);
