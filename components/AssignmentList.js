import React from 'react';

import {StyleSheet, FlatList} from 'react-native';

import Assignment from './Assignment';

const AssignmentList = ({assignments, toggleTask}) => {
  const renderItem = ({item, index}) => (
    <Assignment
      progress={item.progress}
      title={item.title}
      deadline={item.deadline}
      tasks={item.tasks}
      key={index}
      toggleTask={taskIndex => {
        toggleTask(index, taskIndex);
      }}></Assignment>
  );
  return <FlatList data={assignments} renderItem={renderItem}></FlatList>;
};

const styles = StyleSheet.create({
  container: {},
});

export default AssignmentList;
