import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import Assignment from './Assignment';
import {useNavigation} from '@react-navigation/native';

// AssignmentList contains a full list of the assignments the user has made
const AssignmentList = ({assignments, toggleTask, deleteAssignment}) => {
  // Includes navigation to go to EditNavigation
  const navigation = useNavigation();
  // Render the assignment component with relevant information
  const renderItem = ({item, index}) => (
    <Assignment
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
        navigation.navigate('EditAssignment', {assignment: item, index});
      }}></Assignment>
  );

  return <FlatList data={assignments} renderItem={renderItem}></FlatList>;
};

const styles = StyleSheet.create({
  container: {},
});

export default AssignmentList;
