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
          {stats.map((stat, i) => {
            {
              /* const icon = Object.keys(stat)[0].toString();
            const path = `../assets/icons/${icon}.png`;
            const source = require(path) || require('../assets/icons/yoga.png'); */
            }
            return (
              <View key={i} style={styles.stat}>
                <Image
                  source={{
                    uri: 'asset:icons/yoga.png',
                    crop: { left: 10, top: 50, width: 20, height: 40 }
                  }}
                />
                <Text style={styles.statText}>
                  {Object.values(stat)[0].toString()}
                </Text>
              </View>
            );
          })}
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
  statText: {
    fontSize: 20
  }
});
