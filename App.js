import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './views/Dashboard';
import SearchView from './views/SearchView';
import Projects from './views/Projects';
import Login from './views/AuthViews/Login';


const Stack = createNativeStackNavigator();

export default function App() {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ?
          <>
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Explore' component={SearchView} />
            <Stack.Screen name='Projects' component={Projects} />
          </> 
          :
          <>
            <Stack.Screen name='Login' component={Login} />
          </>
         }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
