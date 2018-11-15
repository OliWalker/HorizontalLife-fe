import React from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { Svg } from 'expo';

const styles = StyleSheet.create = ({
  container: {
    flex: 1
  },
  container_header: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text_route_name: {
    fontSize: 40,
    fontWeight: '400',
    marginLeft: 20,
  },
  text_grade: {
    fontSize: 45,
    marginLeft: 30
  }
});


class RoutePreview extends React.Component {

  static navigationOptions = {
    header: null
  };

  static defaultProps = {
    grades: ['5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+',
      '7A', '7A+', '7B', '7B+', '7C', '7C+',
      '8A', '8A+', '8B', '8B+', '8C', '8C+']
  }

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
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
      );
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
      );
      return circles;
    }
  }

  render() {
    const {
      imageUri,
      routeName,
      grade,
      color,
      type,
      svg,
      svg_height,
      svg_width
    } = this.props.navigation.state.params;
    const { height, width } = this.state;
    return (
      <View>
        {height && 
          <View
            style={styles.container}>
            <View
              style={{
                ...styles.container_header,
                height: height-svg_height
              }}
            >
              <Text
                style={{
                  ...styles.text_route_name,
                  width: width * 0.6
                }}
              >
                {routeName}
              </Text>
              <Text
                style={styles.text_grade}
              >
                {this.props.grades[grade]}
              </Text>
            </View>
            <Image
              source={{ uri: imageUri }}
              style={{
                height: svg_height,
                width: svg_width,
              }}>
            </Image>
            <View
              style={{
                position: 'absolute',
                height: svg_height,
                width: svg_width,
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
