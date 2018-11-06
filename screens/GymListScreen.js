import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements';

import data from '../data';

export default class GymListScreen extends React.Component {
  //this is the top bar
  static navigationOptions = {
    header: null
  };

  render() {
    //const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.view}>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={200}
          snapToAlignment={'center'}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('HomeGymScreen', {})}
          >
            <Card
              containerStyle={styles.myGymCard}
              image={{ uri: data.Gym.picture }}
            >
              <Text style={styles.title}>{data.Gym.gymName}</Text>
              <Text style={styles.open}>Open 8:00 - 23:00</Text>
            </Card>
          </TouchableHighlight>
          <Card
            containerStyle={styles.myGymCard}
            image={{ uri: data.Gym.picture }}
          >
            <Text style={styles.title}>{data.Gym.gymName}</Text>
            <Text style={styles.open}>Open 8:00 - 23:00</Text>
          </Card>
          <Card
            containerStyle={styles.myGymCard}
            image={{ uri: data.Gym.picture }}
          >
            <Text style={styles.title}>{data.Gym.gymName}</Text>
            <Text style={styles.open}>Open 8:00 - 23:00</Text>
          </Card>
        </ScrollView>

        <Card title="Gyms Close By" style={styles.manyCard}>
          <Text style={styles.mapIcon}>[MAP]</Text>

          {[data.Gym, data.Gym, data.Gym, data.Gym, data.Gym, data.Gym].map(
            (u, i) => {
              return (
                <View key={i} style={styles.otherGym}>
                  <Image
                    style={styles.otherGymPic}
                    resizeMode="cover"
                    source={{ uri: data.Gym.picture }}
                  />
                  <View style={styles.OtherGymInfo}>
                    <Text>{u.gymName}</Text>
                    <Text style={styles.open}>Open 8:00 - 23:00</Text>
                    <Text>Many Icons</Text>
                  </View>
                  <Divider style={{ backgroundColor: 'blue' }} />
                </View>
              );
            }
          )}
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: { paddingTop: 25 },
  myGymCard: {
    width: 300
  },
  title: { fontWeight: 'bold' },
  open: { color: 'green' },
  manyCard: { position: 'relative' },
  mapIcon: { position: 'absolute', right: 5 },

  otherGym: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    width: '100%'
  },
  otherGymPic: {
    width: 100,
    height: 100
  },
  OtherGymInfo: {
    width: 200,
    height: 100,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
});
