import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Svg } from 'expo';

class ColorWheel extends React.Component {

  state = {
    selectedColor: 'yellow',
    strokeWidth: 30,
    containerWidth: 200,
    containerHeight: 200,
    // wheel: {
    //   radius:
    // }
    // colorArray: ['orange', 'red']
    colorArray: ['orange', 'red', 'pink', 'purple', 'blue', 'lightskyblue', 'springgreen', 'yellow']
  }
  renderPaths = () => {
    const { colorArray, strokeWidth, containerWidth, containerHeight } = this.state;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    const radiusXY = 80;
    const xAxisRotation = 0;
    const largeArcFlag = 0;
    const sweepFlag = 0;

    const wheelPartAngle = 360 / colorArray.length;
    const D = radiusXY*2;
    const paths = colorArray.map((path, index) => {

      const color = colorArray[index]

      const startNonZeroPosition = `${
        //x
        Math.round(
          Math.cos(
            (wheelPartAngle * index) * (Math.PI / 180)) * radiusXY) + centerX} ${
        //y
        D - (
          Math.round(
            Math.sin(
              (wheelPartAngle  * index) * (Math.PI / 180)) * radiusXY) + centerY)}`;

      const M = index === 0
        ? `${D} ${radiusXY}`
        : startNonZeroPosition;

      const d = `M${M} A ${radiusXY} ${radiusXY} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${
        //x
        Math.round(
          //
          Math.cos(
            (wheelPartAngle * (index + 1)) * (Math.PI / 180)) * radiusXY) + centerX} ${
        //y
        D - (
          Math.round(
            Math.sin(
              (wheelPartAngle * (index + 1)) * (Math.PI / 180)) * radiusXY) + centerY)}`;
      return (
        <Svg.Path
          key={color}
          d={d}
          fill='none'
          stroke={color}
          strokeWidth={strokeWidth}
        />
        // <Svg.Path
        //   d='M200 100
        //   A 100 100, 0, 0, 0, 100 0'
        //   fill='none'
        //   stroke='red'
        //   strokeWidth={strokeWidth}
        // />
      )
    })
    return  paths;
  }

  render() {
    const {selectedColor, strokeWidth, containerWidth, containerHeight} = this.state;
    return (
      <Svg
        height={containerHeight}
        width={containerWidth}
        style={{margin: 20}}
      >
        <Svg.Circle
          cx={100}
          cy={100}
          r={50}
          fill={selectedColor}
        />
        {this.renderPaths()}
        {/* <Svg.Path
          d='M200 100
          A 100 100, 0, 0, 0, 153 15'
          fill='none'
          stroke='red'
          strokeWidth={strokeWidth}
        />
        <Svg.Path
          d='M100 0
          A 100 100, 0, 0, 0, 0 100'
          fill='none'
          stroke='blue'
          strokeWidth={strokeWidth}
        />
        <Svg.Path
          d='M0 100
          A 100 100, 0, 0, 0, 100 200'
          fill='none'
          stroke='green'
          strokeWidth={strokeWidth}
        />
        <Svg.Path
          d='M100 200
          A 100 100, 0, 0, 0, 200 100'
          fill='none'
          stroke='yellow'
          strokeWidth={strokeWidth}
        /> */}
      </Svg>
    );
  }

}

export default ColorWheel;
