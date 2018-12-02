import React from 'react';
import {
  View,
  Button,
  Platform,
  StatusBar,
  Dimensions,
  SectionList,
  Text,
  ActivityIndicator
} from 'react-native';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Colors from '../constants/Colors';
import RouteListItem from '../components/RouteListItem';

const platformMainColor = Platform.OS == 'ios'
  ? Colors.iosMain : Colors.androidMain;

const GET_ROUTES = gql`
{
  all_routes {
    _id
    name
    grade_routesetter
  }
}`;

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
      name={item.name}
      grade={item.grade_routesetter}
      new={item.new}
      done={section.title == 'done'}
    />
    

  render() {
    const { sections } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <StatusBar hidden />
        <Query query={GET_ROUTES}>
          {({ loading, error, data }) => {
            if (loading) return (
              <ActivityIndicator
                size='large'
                color={platformMainColor}
                style={{
                  
                }}
              />
            );
            if (error) return <Text>`Error! ${JSON.stringify(error)}`</Text>;
            if (data) {
              const routes = [{
                data: data.all_routes,
                title: 'pending'
              }];
              console.log(routes);
              return (
                <SectionList
                  ItemSeparatorComponent={this.renderSeparator}
                  renderSectionFooter={this.renderSeparator}
                  sections={routes}
                  renderItem={this.renderItem}
                  keyExtractor={item => item._id}
                />      
              );
            }
          }}
        </Query>
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
