import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Svg } from 'expo';


class RoutePreview extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    }
  }

  renderSVG = (color, type, svg) => {
    if (type == 'line') {
      return (
        <Svg.Path
          d={svg}
          fill='none'
          stroke={color}
          strokeWidth={2.5}
        />
      )
    } else {
      const circles = svg.map(point =>
        <Svg.Circle
          key={point.timestamp}
          cx={point.x}
          cy={point.y}
          r={25}
          strokeWidth={2.5}
          stroke={color}
          fill='none'
        />
      )
      return circles
    }
  }

  render() {

    const { imageUri, color, type, svg, svg_height, svg_width } = this.props.navigation.state.params;
    const { height } = this.state;
    return (
      <View
        style={{
          backgroundColor: 'red'
        }}
      >
        {height && 
          <View
            style={{
              flex: 1,
              backgroundColor: 'yellow',

            }}>
            <View
              style={{
                backgroundColor: 'pink',
                height: height-svg_height
              }}
            ></View>
            <Image
              source={{ uri: imageUri }}
              style={{
                height: svg_height,
                width: svg_width,
              }}>
            </Image>
            <View
              style={{
                height: svg_height,
                width: svg_width,
                position: 'absolute',
                marginTop: height - svg_height
              }}
            >
              <Svg
                height={svg_height}
                width={svg_width}
              >
                {this.renderSVG(color, type, svg)}
              </Svg>
            </View>
          </View>
        }
      </View>
    );
  }
}

export default RoutePreview;
