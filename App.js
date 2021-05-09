import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';
import Assignments from './screens/Assignments';
import EditAssignment from './screens/EditAssignment';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const App = () => {
  return (
    // Navigation for app
    <View style={{flex: 1}}>
      <NavigationContainer>
        <SafeAreaView style={{width: '100%', height: '100%'}}>
          <Stack.Navigator initialRootName="Assignments" headerMode="none">
            <Stack.Screen name="Assignments" component={Assignments} />
            <Stack.Screen name="EditAssignment" component={EditAssignment} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
};

export default App;
