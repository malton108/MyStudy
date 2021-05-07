import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';

import AssignmentList from '../components/AssignmentList';

import AsyncStorage from '@react-native-async-storage/async-storage';

const test = [
  {
    title: 'Test',
    deadline: new Date(),
    tasks: [
      {text: 'Task 1', checked: true},
      {text: 'Task 2', checked: false},
    ],
  },
];

const Assignments = ({}) => {
  const [assignments, setAssignments] = useState([]);
  useEffect(async () => {
    const data = test;
    setAssignments(data);
  }, []);
  const addAssignment = assignment => {
    const newAssignments = assignments;
    newAssignments.push(assignment);
    setAssignments(newAssignments);
    storeData(newAssignments);
  };
  const toggleTask = (assignmentIndex, taskIndex) => {
    const newAssignments = assignments;
    assignments[assignmentIndex].tasks[taskIndex].checked = !assignments[
      assignmentIndex
    ].tasks[taskIndex].checked;
    setAssignments(newAssignments);
    storeData(newAssignments);
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
      <Button title="Add Deadline"></Button>
      <AssignmentList
        assignments={assignments}
        toggleTask={toggleTask}></AssignmentList>
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
  container: {width: '100%', height: '100%', backgroundColor: 'red'},
  logo: {width: '90%'},
});

export default Assignments;
