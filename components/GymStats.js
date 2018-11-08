import React from 'react';
import data from '../data';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Rating } from 'react-native-elements';
import OpenTimesCard from './OpenTimesCard';

export default class GymStats extends React.Component {
  state = { openTimes: false };
  hideCard = () => this.setState({ openTimes: false });
  showCard = () => this.setState({ openTimes: true });

  render() {
    const { stats } = data.Gym;
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <TouchableOpacity style={styles.openTillButton} onPress={this.showCard}>
          <Text style={styles.openTillText}>Open Till 23:00</Text>
        </TouchableOpacity>

        {this.state.openTimes ? (
          <OpenTimesCard
            hideCard={this.hideCard}
            isVisibile={this.state.openTimes}
          />
        ) : null}

        <Rating
          showRating
          type="star"
          fractions={1}
          startingValue={3.6}
          imageSize={40}
          style={{ paddingVertical: 10 }}
        />
        <View style={styles.ratingsBox}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.stat}>
              <Image
                source={require('../assets/images/robot-dev.png')}
                style={styles.icon}
              />
              <Text style={styles.statText}>{Object.values(stat)[0]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.ratingsBox}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.stat}>
              <Image
                source={require('../assets/images/robot-dev.png')}
                style={styles.icon}
              />
              <Text style={styles.statText}>{Object.values(stat)[0]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    height: 1800,
    position: 'relative'
  },
  openTillButton: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  openTillText: {
    color: 'green'
  },
  ratingsBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 30
  },
  stat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 110,
    marginBottom: 10
  },
  icon: {
    width: 50,
    height: 50
  },
  statText: {
    fontSize: 20
  }
});
