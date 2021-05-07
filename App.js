import 'react-native-gesture-handler';

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaView, View} from 'react-native';

import Assignments from './screens/Assignments';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <NavigationContainer>
        <SafeAreaView
          style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
          <Stack.Navigator initialRootName={assignments}>
            <Stack.Screen name="Assignments" component={Assignments} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
};

export default App;
