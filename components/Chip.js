import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  chip: {
    height: 30,
    flex: 0,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    margin: 3,
    borderRadius: 50,
  }
});

export default class Chip extends React.Component {

  static defaultProps = {
    name: '',
    color: '',
    backgroundColor: '',
    onPress: () => null,
  }

  render () {
    const { name, color, backgroundColor, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress = {() => onPress()}
      >
        <View
          style={{
            ...styles.chip,
            backgroundColor,
          }}
        >
          <Text
            style={{
              color
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity >
    );
  }
}
