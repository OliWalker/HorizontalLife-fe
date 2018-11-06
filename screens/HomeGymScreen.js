import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Tile, Avatar, ButtonGroup, Card } from 'react-native-elements';

import data from '../data';

export default class GymListScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  state = {
    selectedIndex: 2
  };

  updateIndex = selectedIndex => this.setState({ selectedIndex });

  render() {
    const buttons = ['Stats', 'Feed', 'Routes'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.page}>
        <Image source={{ uri: data.Gym.picture }} style={styles.imageOverlay} />
        <View style={styles.banner}>
          <Text style={styles.gymName}>{data.Gym.gymName}</Text>
        </View>

        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 30 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: { position: 'relative', backgroundColor: 'white', flex: 1 },
  imageOverlay: {
    height: 200,
    width: 411
  },
  banner: {
    position: 'absolute',
    top: 170,
    width: 411,
    height: 30,
    backgroundColor: 'rgba(30,30,30, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  gymName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 411
  }
});
