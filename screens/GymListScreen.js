import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import data from '../data';

export default class GymListScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.view}>
        <Card
          containerStyle={styles.myGymCard}
          image={{ uri: data.Gym.picture }}
        >
          <Text style={styles.title}>{data.Gym.gymName}</Text>
          <Text style={styles.open}>Open 8:00 - 23:00</Text>
        </Card>

        <Card title="Gyms Close By">
          {[data.Gym, data.Gym, data.Gym, data.Gym].map((u, i) => {
            return (
              <View key={i} style={styles.otherGym}>
                <Image
                  style={styles.otherGymPic}
                  resizeMode="cover"
                  source={{ uri: data.Gym.picture }}
                />
                <View>
                  <Text>{u.gymName}</Text>
                </View>
              </View>
            );
          })}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: { paddingTop: 25 },
  myGymCard: {
    width: '50%'
  },
  title: { fontWeight: 'bold' },
  open: { color: 'green' },

  otherGym: { display: 'flex', flexDirection: 'row', margin: 10 },
  otherGymPic: {
    width: 100,
    height: 100
  }
});
