import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import ActionButton from './ActionButton';

import CheckableItem from './CheckableItem';

import ProgressBar from './ProgressBar';

const Assignment = ({progress, title, deadline, tasks, toggleTask}) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{deadline.toLocaleDateString()}</Text>
        </View>
        <ActionButton icon="edit" color="#86AFB5"></ActionButton>
        <ActionButton icon="trash" color="#86AFB5"></ActionButton>
      </View>
      <ProgressBar progress={progress}></ProgressBar>
      {tasks.forEach((task, index) => (
        <CheckableItem
          text={task.text}
          checked={task.checked}
          toggleChecked={() => {
            toggleTask(index);
          }}></CheckableItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {flexDirection: 'row'},
  headingText: {},
  title: {fontSize: 16},
  subtitle: {fontSize: 12},
});

export default Assignment;
