import React, {useState} from 'react';
import {StyleSheet, View, Image, Button, Alert, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TaskList from '../components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';

// EditAssignment is able to edit an assignment that is passed or create a new one
const EditAssignment = ({navigation, route}) => {
  const assignment = route?.params?.assignment;

  const [title, setTitle] = useState(assignment ? assignment.title : '');

  const [date, setDate] = useState(
    assignment ? new Date(assignment.deadline) : new Date(),
  );

  const [tasks, setTasks] = useState(assignment ? assignment.tasks : []);

  // Add a task in an assignment
  const addTask = text => {
    setTasks(tasks.concat([{title: text, checked: false}]));
  };

  // Delete a task in an assignment
  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Add a new assignment
  const addAssignment = async () => {
    // Check if there is any text in the title
    if (title === '') {
      Alert.alert('You cannot have an empty title!');
      return;
    }
    // Check if any tasks have been added
    if (tasks.length < 1) {
      Alert.alert('You cannot have 0 tasks!');
      return;
    }
    const assignments = await getData();
    const newAssignment = {
      title,
      deadline: date.getTime(),
      tasks,
    };
    if (assignment) {
      assignments[route.params.index] = newAssignment;
    } else {
      assignments.push(newAssignment);
    }
    storeData(assignments);
    navigation.goBack();
  };

  // Render the logo, a text input for the title, a date input for the assignment date and a task list to add tasks into the assignment
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
      <TextInput
        editable
        maxLength={40}
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <DatePicker mode="date" date={date} onDateChange={setDate}></DatePicker>
      <TaskList
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}></TaskList>
      <View style={styles.buttons}>
        <Button
          title="Cancel"
          color="#86AFB5"
          onPress={navigation.goBack}></Button>
        <Button
          title={assignment ? 'Edit Assignment' : 'Add Assignment'}
          color="#86AFB5"
          onPress={addAssignment}></Button>
      </View>
    </View>
  );
};

// Using async storage to store the assignments created by the user
const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@assignments', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

// Get the data that is stored containing the assignments the user has created
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@assignments');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', alignItems: 'center'},
  logo: {
    width: '90%',
    height: undefined,
    aspectRatio: 510 / 123,
    alignSelf: 'center',
  },
  button: {
    margin: 20,
  },
  input: {
    margin: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: '90%',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    width: '90%',
  },
});

export default EditAssignment;
