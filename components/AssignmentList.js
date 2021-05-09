import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import Assignment from './Assignment';
import {useNavigation} from '@react-navigation/native';

const AssignmentList = ({assignments, toggleTask, deleteAssignment}) => {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <Assignment
      progress={item.progress}
      title={item.title}
      deadline={item.deadline}
      tasks={item.tasks}
      key={index}
      toggleTask={taskIndex => {
        toggleTask(index, taskIndex);
      }}
      deleteAssignment={() => {
        deleteAssignment(index);
      }}
      editAssignment={() => {
        navigation.navigate('EditAssignment', {assignment: item});
      }}></Assignment>
  );
  return <FlatList data={assignments} renderItem={renderItem}></FlatList>;
};

const styles = StyleSheet.create({
  container: {},
});

export default AssignmentList;
