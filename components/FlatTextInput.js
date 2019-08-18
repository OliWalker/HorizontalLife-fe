import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

import colors from '../constants/Colors';

const platformMainColor = Platform.OS == 'ios'
  ? colors.iosMain : colors.androidMain;

const styles = StyleSheet.create({
  container_name: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: platformMainColor,
    borderBottomWidth: 2,
    borderRadius: 6,
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
});

export default class Chip extends React.Component {

  static defaultProps = {
    height: 40,
    width: 200,
    placeholder: 'placeholder',
    label: 'label',
    onChangeText: () => {}
  }

  state = {
    inputFocus: false
  }

  render() {
    const { height, width, placeholder, label, getText } = this.props;
    return (
      <>
        <Text
          style={styles.input_name_label}
        >
          {label}
        </Text>
        <View style={{
          ...styles.container_name,
          height: height,
          backgroundColor: this.state.inputFocus
            ? 'rgba(52, 143, 249, 0.34)' : 'rgba(230, 230, 232, 1)',
        }}>
          <TextInput
            style={{
              ...styles.container_input_name,
              width: width,
            }}
            onChangeText={text =>  getText(text)}
            onFocus={() => this.setState((state) => {
              return {
                ...state,
                inputFocus: true
              };
            })}
            onEndEditing={() => this.setState((state) => {
              return {
                ...state,
                inputFocus: false
              };
            })}
            maxLength={25}
            placeholder={placeholder}
            placeholderTextColor='rgba(128, 124, 124, 1)'
            underlineColorAndroid='transparent'
          />
        </View>
      </>
    );
  }
}
