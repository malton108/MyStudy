import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Prompt from 'react-native-input-prompt';
import ActionButton from './ActionButton';

// A task list contains all the tasks a user has added into an assignment
// These tasks can also be deleted
const TaskList = ({tasks, addTask, deleteTask}) => {
  const [promptVisible, setPromptVisible] = useState(false);
  // Render the tasks name with a button to delete it
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.row} key={index}>
        <Text>{item.title}</Text>
        <ActionButton
          icon="trash"
          onPress={() => {
            deleteTask(index);
          }}></ActionButton>
      </View>
    );
  };

  const addItem = () => {
    setPromptVisible(true);
  };

  // Allow the user to add a new task or delete an existing one
  return (
    <View style={styles.container}>
      <Prompt
        title="Add new task?"
        placeholder="Task name"
        visible={promptVisible}
        onCancel={() => {
          setPromptVisible(false);
        }}
        onSubmit={text => {
          setPromptVisible(false);
          addTask(text);
        }}></Prompt>
      <View style={styles.row}>
        <Text style={styles.tasks}>Tasks</Text>
        <ActionButton icon="plus" onPress={addItem}></ActionButton>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.hint}>Press + to add a task!</Text>
        }></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 14},
  container: {width: '90%', flex: 1},
  tasks: {fontWeight: 'bold', fontSize: 16},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {alignSelf: 'center', color: 'grey'},
});

export default TaskList;
