import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  Text,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TaskList from '../components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAssignment = ({navigation, route}) => {
  const assignment = route.params.assignment;
  const [title, setTitle] = useState(assignment ? assignment.title : '');
  const [date, setDate] = useState(
    assignment ? new Date(assignment.deadline) : new Date(),
  );
  const [tasks, setTasks] = useState(assignment ? assignment.tasks : []);
  const addTask = text => {
    setTasks(tasks.concat([text]));
  };
  const addAssignment = async () => {
    const assignments = await getData();
    const assignment = {
      title,
      deadline: date.getTime(),
      tasks: tasks.map(task => {
        return {title: task, checked: false};
      }),
    };
    assignments.push(assignment);
    storeData(assignments);
    navigation.goBack();
  };
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
      <TaskList tasks={tasks} addTask={addTask}></TaskList>
      <View style={styles.buttons}>
        <Button
          title="Cancel"
          color="#86AFB5"
          onPress={navigation.goBack}></Button>
        <Button
          title="Add Assignment"
          color="#86AFB5"
          onPress={addAssignment}></Button>
      </View>
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
