import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import Prompt from 'react-native-input-prompt';
import ActionButton from './ActionButton';

const TaskList = ({tasks, addTask}) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const renderItem = ({item, index}) => {
    return <Text key={index}>{item}</Text>;
  };
  const addItem = () => {
    setPromptVisible(true);
  };
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
      <View style={styles.heading}>
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
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {alignSelf: 'center', color: 'grey'},
});

export default TaskList;
