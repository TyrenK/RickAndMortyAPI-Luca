
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterListScreen from './screens/CharacterListScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen'; // Definido em outro arquivo

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharacterList">
        <Stack.Screen name="CharacterList" component={CharacterListScreen} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
