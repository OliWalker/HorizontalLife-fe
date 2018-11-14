import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  Slider,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  container_top: {
    paddingTop: 10,
    paddingHorizontal: 10
  },
  container_name: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  container_input_name: {
    height: 40,
    marginLeft: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  text_grade: {
    alignSelf: 'center',
    fontSize: 50
  },
  container_tags: {
    flex: 0,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  tag: {
    height: 30,
    flex: 0,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    margin: 3,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray'
  },
  container_bottom: {
    backgroundColor: 'white',
    shadowColor: 'black'
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
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ publishRoute: this.publishRoute });
  }

  publishRoute = () => {
    const { routeName, chosenTags } = this.state;
    const grade = this.props.grades[this.state.grade];
    const { imageUri, color, type, svg } = this.props.navigation.state.params;
    console.log('DATA TO PUBLISH===>', routeName, chosenTags, grade, imageUri, color, type, svg) //eslint-disable-line
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
    grade: 0,
    chosenTags: []
  }

  chooseTag = (tag) => {
    const { chosenTags } = this.state;
    const index = chosenTags.indexOf(tag);
    if (index >= 0) {
      const array = this.state.chosenTags
      this.setState((state) => {
        return {
          ...state,
          chosenTags: array.filter(el => el !== tag)
        }
      })
    } else {
      this.setState((state) => {
        return {
          ...state,
          chosenTags: [
            ...state.chosenTags,
            tag
          ]
        }
      })
    }
  }

  renderTags = () => {
    const tags = this.props.tags.map((tag) => {
      const isSelected = this.state.chosenTags.includes(tag);
      const color = isSelected ? 'yellow' : 'white';
      return (
        <TouchableOpacity
          key={tag}
          onPress={() => this.chooseTag(tag)}
        >
          <View
            style={{
              ...styles.tag,
              backgroundColor: color,
            }}
          >
            <Text>
              {tag}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
    return tags;
  }

  gradeUpdate = (value) => {
    this.setState((state) => {
      return {
        ...state,
        grade: value
      }
    })
  }

  render() {
    const { height, width } = Dimensions.get('window');
    // console.log(this.props.navigation.state.params)
    if (height) {
      return (
        <View style={styles.container}>
          <View style={{
            ...styles.container_top,
            height: height * 0.75,
          }}>
            <View style={{
              ...styles.container_name,
              height: height * 0.1
            }}>
              <Text>
                NAME
              </Text>
              <TextInput
                style={{
                  ...styles.container_input_name,
                  width: width * 0.6
                }}
                onChangeText={text => this.setState((state) => {
                  return {
                    ...state,
                    routeName: text
                  }
                })}
                maxLength={25}
                placeholder='Plastic tortilla'
                placeholderTextColor='grey'
              />
            </View>
            <View style={{
              height: height * 0.2
            }}>
              <Text>
                GRADE
              </Text>
              <Text
                style={styles.text_grade}
              >
                {this.props.grades[this.state.grade]}
              </Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={this.props.grades.length-1}
                value={this.state.grade}
                onValueChange={value => this.gradeUpdate(value)}              
              >
              </Slider>
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
              title='preview'
              onPress={() => console.log('pressed preview')} //eslint-disable-line
            />
          </View>
        </View>
      );
    }
  }
}

export default withNavigation(UploadRouteScreen);
