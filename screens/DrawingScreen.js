import React from 'react';
import { View, StatusBar, Image, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import { Svg } from 'expo';


class DrawingScreen extends React.Component {

    //this is the top bar
    static navigationOptions = {
      header: null
    };

  state = {
    image: '',
    circleMode: false
  };

  render() {
    const { imageUri } = this.props.navigation.state.params;
    console.log(imageUri);
    if (imageUri) {
      return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <StatusBar hidden />
          {Dimensions.get('window') &&
          <>
          <Svg
            height={Dimensions.get('window').height-120}
            width={Dimensions.get('window').width}
            // viewBox="0 0 100 100" //???
            zIndex={2}
          >
            <Svg.Circle
              cx={50}
              cy={100}
              r={50}
              strokeWidth={2.5}
              stroke="#e74c3c"
              fill="#f1c40f"
            />
          </Svg>
          <Image
            source={{ uri: imageUri }}
            style={{
              position: 'absolute',
              // paddingTop: 240,
              height: Dimensions.get('window').height-120,
              width: Dimensions.get('window').width,
              zIndex: 1
            }}>
          </Image>
          </>
          }
          <View
            style={{
              flex: 0,
              backgroundColor: 'rgba(255, 255, 255, 0)',
              height: 120,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              buttonStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0)',
                width: 40,
                height: 40,
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 40,
              }}
              title=''
              icon={
                <Icon
                  name='close'
                  size={20}
                  color='black'
                />}
              // containerStyle={{ marginTop: 20, marginLeft: 20, zIndex: 3 }}
            />
            <Button
              title='Line /|/'
              onPress={() => {
                if (this.state.circleMode) {
                  this.setState((state) => {
                    return {
                      ...state,
                      circleMode: !state.circleMode
                    }
                  })
                }
                console.log('drawing line', 'circleMode->',this.state.circleMode)
              }}
            />
            <Button
              title='ColorPicker'
              onPress={() => console.log('color picker')}
            />
            <Button
              title='Circle oOo'
              onPress={() => {
                if (!this.state.circleMode) {
                  this.setState((state) => {
                    return {
                      ...state,
                      circleMode: !state.circleMode
                    }
                  })
                }
                console.log('putting circles', 'circleMode->',this.state.circleMode)
              }}
            />

          </View>
        </View>
      );
    }

  }
}


export default withNavigation(DrawingScreen);
