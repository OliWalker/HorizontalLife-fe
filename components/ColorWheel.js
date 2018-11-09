import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Svg } from 'expo';

class ColorWheel extends React.Component {

  state = {
    selectedColor: 'yellow',
  }

  chooseColor = (color) => {
    this.setState({
      selectedColor: color
    })
    this.props.getColor(color)
  }


  renderPaths = () => {
    //https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs
    const { colorArray } = this.props;
    const  { size } = this.props;
    const strokeWidth = size * 0.15;
    const centerX = size / 2;
    const centerY = size / 2;
    const radiusXY = size * 0.4;
    const xAxisRotation = 0;
    const largeArcFlag = 0;
    const sweepFlag = 0;
    const wheelPartAngle = 360 / colorArray.length;

    const paths = colorArray.map((path, index) => {

      const color = colorArray[index]

      const startNonZeroPosition = `${
        //x
        Math.round(
          Math.cos(
            (wheelPartAngle * index) * (Math.PI / 180)) * radiusXY) + centerX} ${
        //y
        size - (
          Math.round(
            Math.sin(
              (wheelPartAngle  * index) * (Math.PI / 180)) * radiusXY) + centerY)}`;

      //start point for the path
      const M = index === 0
        ? `${centerX + radiusXY} ${size/2}`
        : startNonZeroPosition;

      //arc of the ellipse
      const d = `M${M} A ${radiusXY} ${radiusXY} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${
        //x
        //Use Math.round() because number is too small, Ex.: see cos90
        Math.round(
          // `* (Math.PI / 180)` to conver degrees do radians because Math.cos() accept radians as parameter
          Math.cos(
            (wheelPartAngle * (index + 1)) * (Math.PI / 180)) * radiusXY) + centerX} ${
        //y
        //Deduct y postion from size (Container's square side) because y axis is reversed
        size - (
          Math.round(
            Math.sin(
              (wheelPartAngle * (index + 1)) * (Math.PI / 180)) * radiusXY) + centerY)}`;
      return (
        <TouchableWithoutFeedback
          key={color}
          onPress={() => this.chooseColor(color)}
        >
          <Svg.Path
            d={d}
            fill='none'
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </TouchableWithoutFeedback>
      )
    })
    return  paths;
  }

  render() {
    const { selectedColor } = this.state;
    const { size } = this.props;
    const centerX = size / 2;
    const centerY = size / 2;
    const radiusInnerCircle = size * 0.25
    return (
      <Svg
        height={size}
        width={size}
      >
        <Svg.Circle
          cx={centerX}
          cy={centerY}
          r={radiusInnerCircle}
          fill={selectedColor}
        />
        {this.renderPaths()}
      </Svg>
    );
  }

}

ColorWheel.defaultProps = {
  size: 200,
  colorArray: ['orange', 'red', 'hotpink', 'purple', 'blue', 'lightskyblue', 'springgreen', 'yellow'],
}

export default ColorWheel;
