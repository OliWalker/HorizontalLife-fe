import React from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import Colors from '../constants/Colors';


class RoutesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }
  
  static defaultProps = {
    authorized: true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Gym name',
      headerRight: Platform.OS == 'ios'
        ? (
          <Button
            onPress={navigation.getParam('goToImagePicker')}
            title='Add'
            color='white'
            disabled={!navigation.getParam('authorized')}
          />
        ) : null,
      headerStyle: {
        backgroundColor: Platform.OS == 'ios' 
          ? Colors.iosMain : Colors.androidMain,
      },
      headerTintColor: 'white',
    };
  };


  componentDidMount() {
    this.props.navigation.setParams({
      goToImagePicker: this.goToImagePicker,
      authorized: this.props.authorized
    });
  }

  goToImagePicker = () => {
    this.props.navigation.navigate('ImagePicker');
  }

  keyExtractor = item => item.route.id;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <StatusBar hidden />
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={[
            { route : { id: '1', name: 'Plastic tortilla', grade: '8C', new: true} },
            { route: { id: '2', name: 'Bananas', grade: '8B', new: true } },
            { route: { id: '3', name: 'Aloe', grade: '6A+', new: false } },
            { route: { id: '4', name: 'Bezoya', grade: '5', new: false } },
            { route: { id: '5', name: 'Mononoke', grade: '7C+', new: false } },
          ]}
          renderItem={({ item }) => 
            <TouchableOpacity
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 10
              }}
            >
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500'
                  }}
                >
                  {item.route.name}
                </Text>
                {item.route.new && 
                  <Image
                    source={require('../assets/icons/new-50.png')}
                    style={{
                      height: 25,
                      width: 25
                    }}
                  />}
              </View>
              <Text
                style={{
                  fontSize: 20
                }}>
                {item.route.grade}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={this.keyExtractor}
        />      
        {Platform.OS == 'android' &&
        <ActionButton
          buttonColor={Colors.androidMain}
          onPress={() => this.goToImagePicker()}
          offsetY={this.state.height - 200}
        />}
      </View>
    );
  }
}

export default withNavigation(RoutesScreen);
