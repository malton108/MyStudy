import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Button, Alert} from 'react-native';
import AssignmentList from '../components/AssignmentList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Assignments = ({navigation}) => {
  const [assignments, setAssignments] = useState([]);

  const loadAssignments = async () => {
    const data = await getData();
    setAssignments(data);
  };

  useEffect(() => {
    loadAssignments();
    return navigation.addListener('focus', loadAssignments);
  }, []);

  const updateAssignments = assignments => {
    setAssignments(assignments);
    storeData(assignments);
  };

  const deleteAssignment = index => {
    Alert.alert(
      'Delete Assignment',
      'Are you sure you want to delete assignment: ' +
        assignments[index].title +
        '?',
      [
        {
          text: 'Cancel',
          onPress: null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const newAssignments = [...assignments];
            newAssignments.splice(index, 1);
            updateAssignments(newAssignments);
          },
        },
      ],
    );
  };

  const toggleTask = (assignmentIndex, taskIndex) => {
    // New copies need to be created to not mutate state
    // Create a shallow copy of the assignment
    const assignment = {...assignments[assignmentIndex]};
    // Create a shallow copy of the tasks belonging to the assignment
    assignment.tasks = [...assignment.tasks];
    // Create a copy of the task itself
    const task = {...assignment.tasks[taskIndex]};
    // Toggle the checked item
    task.checked = !task.checked;
    // Assign the newly modified task to the tasks array
    assignment.tasks[taskIndex] = task;
    // Create a shallow copy of assignments
    const newAssignments = [...assignments];
    // Overwrite the assignment with the new copy
    newAssignments[assignmentIndex] = assignment;

    // Update state and write to storage
    updateAssignments(newAssignments);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
      <View style={styles.button}>
        <Button
          title="Add Deadline"
          onPress={() => {
            navigation.navigate('EditAssignment');
          }}></Button>
      </View>
      <AssignmentList
        assignments={assignments}
        toggleTask={toggleTask}
        deleteAssignment={deleteAssignment}></AssignmentList>
    </View>
  );
};

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@assignments', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@assignments');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  logo: {
    width: '90%',
    height: undefined,
    aspectRatio: 510 / 123,
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    margin: 20,
  },
});

export default Assignments;
