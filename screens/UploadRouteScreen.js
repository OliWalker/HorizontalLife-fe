import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  Slider,
  StyleSheet,
  Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';

import Chip from '../components/Chip';
import colors from '../constants/Colors';

const platformMainColor = Platform.OS == 'ios'
  ? colors.iosMain : colors.androidMain;

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
  container_name: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: platformMainColor,
    borderBottomWidth: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(230, 230, 232, 1)',
  },
  input_name_label: {
    position: 'absolute',
    marginTop: -16,
    paddingLeft: 16,
    fontSize: 12,
    color: platformMainColor
  },
  container_input_name: {
    height: 32,
    alignSelf: 'center',
    marginHorizontal: 5,
    fontSize: 18
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
      svg,
      svg_height,
      svg_width
    } = this.props.navigation.state.params;
    console.log('DATA TO PUBLISH===>', routeName, chosenTags, grade, imageUri, height, width, color, type, svg, svg_height, svg_width) //eslint-disable-line
  }

  static defaultProps = {
    tags: ['technical', 'powerfull', 'flexibility', 'overhang',
      'finger strength', 'balance', 'heel hook', 'endurance'],
    grades: ['5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+',
      '7A', '7A+', '7B', '7B+', '7C', '7C+',
      '8A', '8A+', '8B', '8B+', '8C', '8C+']
  }

  state = {
    routeName: '',
    selectedGradeIndex: 0,
    chosenTags: []
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
      return (
        <Chip
          key={tag}
          name={tag}
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
    if (height) {
      return (
        <View style={styles.container}>
          <View style={{
            ...styles.container_top,
            height: height * 0.75,
          }}>
            <Text
              style={styles.input_name_label}
            >
              {this.state.routeName && 'Route\'s name'}
            </Text>
           
          
            <View style={{
              ...styles.container_name,
              height: height * 0.1
            }}>
              <TextInput
                style={{
                  ...styles.container_input_name,
                  width: width * 0.6
                }}
                onChangeText={text => this.setState((state) => {
                  return {
                    ...state,
                    routeName: text
                  };
                })}
                maxLength={25}
                placeholder='Witness the Fitness'
                placeholderTextColor='rgba(128, 124, 124, 1)'
                underlineColorAndroid='transparent'
              />
            </View>
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
        </View>
      );
    }
  }
}

export default withNavigation(UploadRouteScreen);
