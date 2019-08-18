import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import Chip from '../components/Chip';
import colors from '../constants/Colors';

const platformMainColor = Platform.OS == 'ios'
  ? colors.iosMain : colors.androidMain;

class PostScreen extends React.Component {

  static navigationOptions = ({ navigation }) =>  {
    return {
      title: navigation.getParam('name', 'Route'),
      headerStyle: {
        backgroundColor: platformMainColor
      },
      headerTintColor: 'white',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  renderTags = (tagsArray) => {
    const tags = tagsArray.map((tag) => {
      const backgroundColor = 'rgba(52, 143, 249, 0.34)';
      const color = 'rgba(0, 122, 255, 1)';
      return (
        <Chip
          key={tag}
          name={tag}
          color={color}
          backgroundColor={backgroundColor}
        />
      );
    });
    return tags;
  }

  render () {
    const {
      name,
      imageUri,
      color,
      type,
      svg,
      svg_height,
      svg_width,
      tags
    } = this.props.navigation.state.params;
    const { height } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('RoutePreviewScreen', {
            imageUri,
            color,
            type,
            svg,
            svg_height,
            svg_width
          })}
        >
          <Image
            source={{ uri: imageUri}}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center'
            }}
          />
        </TouchableOpacity>
        <View
          style={styles.container_tags}
        >
          {this.renderTags(tags)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_tags: {
    flex: 0,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});

export default PostScreen;
