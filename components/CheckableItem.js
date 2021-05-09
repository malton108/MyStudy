import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

// Checkable items act as checklists in assignments the user can tick and untick
const CheckableItem = ({text, checked, toggleChecked}) => {
  return (
    <TouchableOpacity onPress={toggleChecked} style={styles.container}>
      <CheckBox value={checked} onValueChange={toggleChecked}></CheckBox>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 14},
  container: {flexDirection: 'row', alignItems: 'center'},
});

export default CheckableItem;
