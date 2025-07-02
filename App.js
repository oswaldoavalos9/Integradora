import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import Login from './src/screens/Login';
import Inicio from './src/screens/Inicio';
import Inicio2 from './src/screens/Inicio_2';
import Nosotros from './src/screens/Nosotros';
import AddUser from './src/screens/AddUser';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Nosotros" component={Nosotros} options={{ tabBarLabel: 'Nosotros', tabBarIcon: () => <Text style={{ fontSize: 22 }}>👥</Text>}}/>
      <Tab.Screen name="Inicio" component={Inicio} options={{ tabBarLabel: 'Planta Baja', tabBarIcon: () => <Text style={{ fontSize: 22 }}>⬇️</Text>}}/>
      <Tab.Screen name="Inicio2" component={Inicio2} options={{ tabBarLabel: 'Planta Alta', tabBarIcon: () => <Text style={{ fontSize: 22 }}>⬆️</Text>}}/>
      <Tab.Screen name="AddUser" component={AddUser} options={{ tabBarLabel: 'Agregar Usuario', tabBarIcon: () => <Text style={{ fontSize: 22 }}>➕</Text>}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}