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
    img_url
    svg
    svg_points {
      x
      y
    }
    svg_type
    svg_color
    svg_height
    svg_width
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
      key={item.name}
      name={item.name}
      grade={item.grade_routesetter}
      new={item.new}
      done={section.title == 'done'}
      onPress={() => this.props.navigation.navigate('Post', {
        imageUri: item.img_url,
        name: item.name,
        color: item.svg_color,
        type: item.svg_type,
        svg: item.svg_type == 'circle' ? item.svg_points : item.svg,
        svg_height: item.svg_height,
        svg_width: item.svg_width
      })}
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
          {({ loading, error, data, refetch }) => {
            if (loading) return (
              <ActivityIndicator
                size='large'
                color={platformMainColor}
              />
            );
            if (error) return <Text>`Error! ${JSON.stringify(error)}`</Text>;
            if (data) {
              const routes = [{
                data: data.all_routes,
                title: 'pending'
              }];
              return (
                <SectionList
                  ItemSeparatorComponent={this.renderSeparator}
                  renderSectionFooter={this.renderSeparator}
                  sections={routes}
                  renderItem={this.renderItem}
                  keyExtractor={item => item._id}
                  onRefresh={() => refetch()}
                  refreshing={false}
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
