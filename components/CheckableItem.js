import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const CheckableItem = ({text, checked, toggleChecked}) => {
  return (
    <TouchableOpacity onPress={toggleChecked} style={styles.container}>
      <CheckBox value={checked}></CheckBox>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 14},
  container: {flexDirection: 'row', alignItems: 'center'},
});

export default CheckableItem;
