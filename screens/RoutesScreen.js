import React from 'react';
import {
  View,
  Button,
  Platform,
  StatusBar,
  Dimensions,
  SectionList,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import Colors from '../constants/Colors';
import RouteListItem from '../components/RouteListItem';

class RoutesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }
  
  static defaultProps = {
    authorized: true,
    sections: [
      {
        title: 'pending', data: [
          { route: { id: '1', name: 'Plastic tortilla', grade: '8C', new: true } },
          { route: { id: '2', name: 'Bananas', grade: '8B', new: true } },
          { route: { id: '3', name: 'Aloe', grade: '6A+', new: false } },
          { route: { id: '4', name: 'Bezoya', grade: '5', new: false } },
          { route: { id: '5', name: 'Mononoke', grade: '7C+', new: false } },
          { route: { id: '6', name: 'Plastic tortilla', grade: '8C', new: false } },
          { route: { id: '7', name: 'Bananas', grade: '8B', new: false } },
          { route: { id: '8', name: 'Aloe', grade: '6A+', new: false } },
          { route: { id: '9', name: 'Bezoya', grade: '5', new: false } },
        ]
      },
      {
        title: 'done', data: [
          { route: { id: '16', name: 'Plastic tortilla!', grade: '8C', new: true } },
          { route: { id: '17', name: 'Bananas!', grade: '8B', new: false } },
        ]
      }
    ]
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
      headerLeft: Platform.OS == 'ios'
        ? (
          <Button
            // onPress={navigation.getParam('goToFiler')}
            title='Filter'
            color='white'
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

  renderItem = ({ item, section }) => 
    <RouteListItem
      name={item.route.name}
      grade={item.route.grade}
      new={item.route.new}
      done={section.title == 'done'}
    />
    

  render() {
    const { sections } = this.props;
    return (
      <View>
        <StatusBar hidden />
        <SectionList
          ItemSeparatorComponent={this.renderSeparator}
          renderSectionFooter={this.renderSeparator}
          sections={sections}
          renderItem={this.renderItem}
          keyExtractor={item => item.route.id}
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
