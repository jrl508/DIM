import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './views/Dashboard';
import SearchView from './views/SearchView';
import Projects from './views/Projects';
import Login from './views/AuthViews/Login';
import { useAuthContext } from './providers/AuthProvider';


const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { state } = useAuthContext();
  console.log(state)
  const { isLoggedIn } = state;
  return (
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ?
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

export default Navigator;