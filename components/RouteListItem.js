import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container_left: {
    flex: 0,
    flexDirection: 'row',
  },
  text_name: {
    fontSize: 20,
    fontWeight: '500',
  },
  image_new: {
    height: 25,
    width: 25,
  },
  text_grade: {
    fontSize: 20,
  }
});

export default class RouteListItem extends React.Component {

  static defaultProps = {
    name: '',
    grade: '',
    new: false,
    done: false
  }

  render() {
    const { name, grade, done } = this.props;
    const newRoute = this.props.new;
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View
          style={styles.container_left}
        >
          <Text
            style={{
              ...styles.text_name,
              color: done ? 'lightgrey' : 'black'
            }}
          >
            {name}
          </Text>
          {newRoute &&
            <Image
              source={require('../assets/icons/new-50.png')}
              style={{
                ...styles.image_new,
                opacity: done ? 0.5 : 1
              }}
            />}
        </View>
        <Text
          style={{
            ...styles.text_grade,
            color: done ? 'lightgrey' : 'black'
          }}>
          {grade}
        </Text>
      </TouchableOpacity>
    );
  }
}