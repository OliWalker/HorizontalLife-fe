import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  Slider,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Chip from '../components/Chip';
import FlatTextInput from '../components/FlatTextInput';
import FirebaseClass from '../Firebase';
import colors from '../constants/Colors';

const Firebase = new FirebaseClass();
const platformMainColor = Platform.OS == 'ios'
  ? colors.iosMain : colors.androidMain;

class UploadRouteScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Route',
      headerRight: (
        <Button
          onPress={navigation.getParam('publishRoute')}
          title='Publish'
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ publishRoute: this.publishRoute });
  }

  publishRoute = () => {
    const { routeName, chosenTags, selectedGradeIndex } = this.state;
    const grade = this.props.grades[selectedGradeIndex];
    const {
      imageUri,
      height,
      width,
      color,
      type,
      svg_height,
      svg_width
    } = this.props.navigation.state.params;
    const svg = (type == 'line') ? this.props.navigation.state.params.svg : '';
    const svg_points = (type == 'circle')
      ? this.props.navigation.state.params.svg : null;
    this.setState((state) => {
      return {
        ...state,
        loading: true
      };
    });
    Firebase.post(imageUri, routeName)
      .then((uri) => {
        this.props.createNewRoute(routeName, '5c041778d8198c394db5649c',
          grade, uri,height, width, svg, svg_points, svg_height, svg_width,
          color, type, chosenTags)
          .then((data) => {
            if (data) {
              this.props.navigation.dismiss();
              this.setState((state) => {
                return {
                  ...state,
                  loading: false
                };
              });
            }
          });
      })
      .catch((error) => {
        this.setState((state) => {
          return {
            ...state,
            loading: false
          };
        });
        console.error(error);
      });
  }

  static defaultProps = {
    tags: ['TECHNICAL', 'POWERFULL', 'FLEXIBILITY', 'OVERHANG',
      'FINGER_STRENGTH', 'BALANCE', 'HEEL_HOOK', 'ENDURANCE'],
    grades: ['5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+',
      '7A', '7A+', '7B', '7B+', '7C', '7C+',
      '8A', '8A+', '8B', '8B+', '8C', '8C+']
  }

  state = {
    routeName: '',
    selectedGradeIndex: 0,
    chosenTags: [],
    loading: false
  }

  getText = (text) => {
    this.setState((state) => {
      return {
        ...state,
        routeName: text
      };
    });
  }

  chooseTag = (tag) => {
    const { chosenTags } = this.state;
    const index = chosenTags.indexOf(tag);
    if (index >= 0) {
      const array = this.state.chosenTags;
      this.setState((state) => {
        return {
          ...state,
          chosenTags: array.filter(el => el !== tag)
        };
      });
    } else {
      this.setState((state) => {
        return {
          ...state,
          chosenTags: [
            ...state.chosenTags,
            tag
          ]
        };
      });
    }
  }

  renderTags = () => {
    const tags = this.props.tags.map((tag) => {
      const isSelected = this.state.chosenTags.includes(tag);
      const backgroundColor = isSelected 
        ? 'rgba(52, 143, 249, 0.34)' : 'rgba(230, 230, 232, 1)';
      const color = isSelected 
        ? 'rgba(0, 122, 255, 1)' : 'rgba(128, 124, 124, 1)';
      const name = tag.toLowerCase().replace('_', ' ');
      return (
        <Chip
          key={tag}
          name={name}
          color={color}
          backgroundColor={backgroundColor}
          onPress={() => this.chooseTag(tag)}
        />
      );
    });
    return tags;
  }

  gradeUpdate = (value) => {
    this.setState((state) => {
      return {
        ...state,
        selectedGradeIndex: value
      };
    });
  }

  handlePreviewButton = () => {
    if (this.props.navigation.state.params) {
      const {
        imageUri,
        color,
        type,
        svg,
        svg_height,
        svg_width
      } = this.props.navigation.state.params;
      this.props.navigation.navigate('RoutePreviewScreen', {
        imageUri,
        color,
        type,
        svg,
        svg_height,
        svg_width
      });
    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { grades } = this.props;
    const { loading } = this.state;
    if (height) {
      return (
        <View style={styles.container}>
          <View style={{
            ...styles.container_top,
            height: height * 0.75,
          }}>
            <FlatTextInput
              height={height * 0.1}
              width={width * 0.6}
              placeholder='Witness the Fitness'
              label={this.state.routeName && 'Route\'s name'}
              getText={this.getText}
            />
            <View style={{
              height: height * 0.2
            }}>
              <Text
                style={styles.text_grade}
              >
                {grades[this.state.selectedGradeIndex]}
              </Text>
              <View
                style={styles.container_slider}
              >
                <Text>{grades[0]}</Text>
                <Slider
                  step={1}
                  minimumValue={0}
                  maximumValue={grades.length-1}
                  value={this.state.selectedGradeIndex}
                  onValueChange={value => this.gradeUpdate(value)}
                  style={{
                    width: width * 0.8
                  }}             
                >
                </Slider>
                <Text>{grades[grades.length-1]}</Text>
              </View>
            </View>
            <View
              style={styles.container_tags}
            >
              {this.renderTags()}
            </View>
          </View>
          <View
            style={styles.container_bottom}
          >
            <Button
              title='Preview'
              onPress={() => this.handlePreviewButton()}
            />
          </View>
          {loading &&
            <View
              style={{
                position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                height,
                width,
                backgroundColor: 'rgba(245, 245, 245, 0.8)'
              }}
            >
              <ActivityIndicator
                size='large'
                color={platformMainColor}
                animating={true}
              />
            </View>}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  container_top: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  container_slider: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text_grade: {
    paddingTop: 10,
    alignSelf: 'center',
    fontSize: 50
  },
  container_tags: {
    flex: 0,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  container_bottom: {
    backgroundColor: 'rgba(245, 245, 245, 1)'
  }
});

const CREATE_ROUTE = gql`
  mutation createRoute(
      $name: String!,
      $gym_id: ID!,
      $grade_routesetter: String!,
      $img_url: String!,
      $img_height: Int!,
      $img_width: Int!,
      $svg: String,
      $svg_points: [CircleInput],
      $svg_height: Int!,
      $svg_width: Int!,
      $svg_color: String!,
      $svg_type: String!,
      $tags: [Tag]
    ) {
    createRoute(route: {
      name: $name,
      gym_id: $gym_id,
      grade_routesetter: $grade_routesetter,
      img_url: $img_url,
      img_height: $img_height,
      img_width: $img_width,
      svg: $svg,
      svg_points: $svg_points,
      svg_height: $svg_height,
      svg_width: $svg_width,
      svg_color: $svg_color,
      svg_type: $svg_type,
      tags: $tags
    }
    ) {
      route {
        name
      }
    }
  }
`;

const UploadRouteScreenData = graphql(CREATE_ROUTE, {
  props: ({ mutate }) => ({
    createNewRoute: (name, gym_id, grade_routesetter, img_url,
      img_height, img_width, svg, svg_points, svg_height, svg_width,
      svg_color, svg_type, tags) => mutate({
      variables: {
        name, gym_id, grade_routesetter, img_url, img_height,
        img_width, svg, svg_points, svg_height, svg_width,
        svg_color, svg_type, tags
      },
      optimisticResponse: {
        createRoute: {
          route: {
            name
          },
        }
      }
    })
  })
})(UploadRouteScreen);

export default withNavigation(UploadRouteScreenData);
