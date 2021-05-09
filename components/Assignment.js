import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ActionButton from './ActionButton';
import CheckableItem from './CheckableItem';
import ProgressBar from './ProgressBar';

const Assignment = ({
  title,
  deadline,
  tasks,
  toggleTask,
  deleteAssignment,
  editAssignment,
}) => {
  let doneTasks = 0;
  tasks.forEach(task => {
    task.checked && doneTasks++;
  });
  const progress = doneTasks / tasks.length;

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {new Date(deadline).toLocaleDateString()}
          </Text>
        </View>
        <ActionButton
          icon="edit"
          color="#86AFB5"
          onPress={editAssignment}></ActionButton>
        <ActionButton
          icon="trash"
          color="#86AFB5"
          onPress={deleteAssignment}></ActionButton>
      </View>
      <ProgressBar progress={progress}></ProgressBar>
      <View>
        {tasks.map((task, index) => (
          <CheckableItem
            text={task.title}
            checked={task.checked}
            key={index}
            toggleChecked={() => {
              toggleTask(index);
            }}></CheckableItem>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    margin: 2,
    borderColor: 'black',
    borderWidth: 2,
  },
  heading: {flexDirection: 'row', flex: 1},
  headingText: {flexGrow: 1},
  title: {fontSize: 16},
  subtitle: {fontSize: 12},
});

export default Assignment;
