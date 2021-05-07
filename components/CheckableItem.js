import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const CheckableItem = ({text, checked, toggleChecked}) => {
  return (
    <View>
      <CheckBox value={checked} onValueChange={toggleChecked}>
        <Text style={styles.text}>{text}</Text>
      </CheckBox>
    </View>
  );
};

const styles = StyleSheet.create({text: {fontSize: 14}});

export default CheckableItem;
