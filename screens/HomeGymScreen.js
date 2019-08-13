import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import data from '../data';
import GymStats from '../components/GymStats';
import { TouchableOpacity } from 'react-native';

export default class GymListScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null,
  };

  state = {
    stats: true,
  };

  updateIndex = selectedIndex => this.setState({ selectedIndex });

  render() {
    const { stats } = this.state;
    return (
      <View style={styles.page}>
        <Image source={{ uri: data.Gym.picture }} style={styles.imageOverlay} />
        <View style={styles.banner}>
          <TouchableOpacity onPress={() => this.setState({ stats: false })}>
            <Text style={styles.headerButton}>[News Icon]</Text>
          </TouchableOpacity>
          <Text style={styles.gymName}>{data.Gym.gymName}</Text>
          <TouchableOpacity onPress={() => this.setState({ stats: true })}>
            <Text style={styles.headerButton}>[Stats Icon]</Text>
          </TouchableOpacity>
        </View>
        {stats ? <GymStats /> : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  imageOverlay: {
    height: 200,
    width: 411,
  },
  banner: {
    width: 411,
    height: 50,
    backgroundColor: '#031A6B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  gymName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerButton: {
    color: 'white',
    fontSize: 15,
    padding: 10,
  },
});
