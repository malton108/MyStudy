import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Bar from 'react-native-progress/Bar';

// The progress bar updates when a task is checked off in an assignment
const ProgressBar = ({progress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Bar
          animated
          progress={progress}
          color="#86AFB5"
          borderColor="black"
          width={null}></Bar>
      </View>
      <Text>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {fontSize: 14, flexGrow: 1, margin: 10},
  container: {flexDirection: 'row', alignItems: 'center'},
});

export default ProgressBar;
