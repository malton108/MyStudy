import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import Bar from 'react-native-progress/Bar';

const ProgressBar = ({progress}) => {
  return (
    <View style={styles.container}>
      <Bar
        animated
        progress={progress}
        color="#86AFB5"
        borderColor="black"
        style={styles.bar}></Bar>
      <Text>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {fontSize: 14},
  container: {flexDirection: 'row'},
});

export default ProgressBar;
