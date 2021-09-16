import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from "./store/ConfigureStore";
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/Screens/SplashScreen";
import ListScreen from './src/Screens/ListScreen';
import EditDetail from './src/Screens/EditDetail';
import AddToDoTask from './src/Screens/AddToDoTask';

import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator();

const StackNav =() => {
  return (
    <NavigationContainer independent={true} >
      <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="ListScreen" component={ListScreen} />
        <RootStack.Screen name="EditDetail" component={EditDetail} />
        <RootStack.Screen name="AddToDoTask" component={AddToDoTask} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  const store = cfgStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNav />
      </PersistGate>
    </Provider>
  )
}

export default App;
