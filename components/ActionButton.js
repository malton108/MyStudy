import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ActionButton = ({onPress, icon, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={icon} color={color} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({icon: {fontSize: 20}});

export default ActionButton;
