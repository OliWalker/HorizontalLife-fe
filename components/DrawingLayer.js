import React from 'react';
import { View } from 'react-native';
import { Svg } from 'expo';

class DrawingLayer extends React.Component {

  static defaultProps = {
    onPress: () => null,
    numberOfTouches: 1,
  }

  state = {
    points: [],
    strokeWidth: 2.5,
    radius: 25,
    linePath: '',
    linePoints: []
  }

  onStartShouldSetResponder = evt => evt.nativeEvent.touches.length === this.props.numberOfTouches;

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
  }

  onResponderGrant = (evt) => {
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
          fill='none'
        />
      )
      return circles
    }
  }

  renderLine = () => {
    const { strokeWidth, linePath } = this.state;
    const { color } = this.props;
    if (linePath) {
      return (
        <Svg.Path
          d={linePath}
          fill='none'
          stroke={color}
          strokeWidth={strokeWidth}
        />
      )
    }
  }

  componentDidUpdate (prevProps) {
    const { points } = this.state;
    if (prevProps.undoCircle !== this.props.undoCircle
        && points.length > 0) {
      this.setState((state) => {
        return {
          ...state,
          points: points.slice(0, points.length-1)
        }
      })
    }
  }

  render() {
    const { height, width } = this.props;
    return (
      <View
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
        onResponderMove={this.onResponderMove}
        onResponderGrant={this.onResponderGrant}
        style={{
          height,
          width
        }}
      >
        {this.props.children}
        <Svg
          height={height}
          width={width}
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

export default DrawingLayer;
