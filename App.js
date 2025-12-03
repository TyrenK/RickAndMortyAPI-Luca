import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterListScreen from './src/screens/CharacterListScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharacterList">
        <Stack.Screen name="CharacterList" component={CharacterListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
