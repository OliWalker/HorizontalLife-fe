import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  Slider,
  TouchableOpacity
} from 'react-native';

export default class UploadRouteScreen extends React.Component {

  static navigationOptions = ({ navigation }) => { //eslint-disable-line
    return {
      title: 'Your Route',
      headerBackTitle: 'Editor',
      headerRight: (
        <Button
          // onPress={navigation.getParam('publishRoute')}
          onPress={() => console.log('pressed')} //eslint-disable-line
          title='Publish'
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ publishRoute: this.publishRoute });
  }

  publishRoute = () => {
    alert('Publishing Route')
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

  renderTags = () => {
    const tags = this.props.tags.map((tag) => {
      return (
        <TouchableOpacity
          key={tag}
        >
          <View
            style={{
              flex: 0,
              borderWidth: 2,
              backgroundColor: 'pink',
              borderColor: 'gray',
              borderRadius: 50,
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              height: 30,
              justifyContent: 'center',
              margin: 3
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

  render() {
    const { height, width } = Dimensions.get('window');
    if (height) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: 'yellow'
        }}>
          <View style={{
            height: height*0.75,
            backgroundColor: 'pink',
            paddingHorizontal: 10,
            paddingTop: 10

          }}>
            <View style={{
              flex: 0,
              flexDirection: 'row',
              height: height * 0.1,
              backgroundColor: 'red',
              alignItems: 'baseline'
            }}>
              <Text>
                NAME
              </Text>
              <TextInput
                style={{
                  height: 40,
                  width: width * 0.6,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginLeft: 10,
                }}
                placeholder='Plastic tortilla'
              />
            </View>
            <View style={{
              backgroundColor: 'violet',
              height: height * 0.2,
              flex: 0
            }}>
              <Text>
                GRADE
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 50
                }}
              >
                {this.props.grades[this.state.grade]}
              </Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={this.props.grades.length-1}
                value={this.state.grade}
                onValueChange={(value) => {
                  this.setState((state) => {
                    return {
                      ...state,
                      grade: value
                    }
                  })
                }}
              >
              </Slider>
            </View>
            <View
              style={{
                backgroundColor: 'green',
                flex: 0,
                flexWrap: 'wrap',
                flexDirection: 'row'
              }}
            >
              {this.renderTags()}
            </View>
          </View>
          <View>
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
