import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';
import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
 } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../views/Dashboard';
import SearchView from '../views/SearchView';
import Projects from '../views/Projects';
import Login from '../views/AuthViews/Login';
import { useAuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const TabNav = () => {

    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Explore') {
                iconName = focused ? 'ios-search' : 'ios-search-outline';
              } else if (route.name === 'Projects') {
                iconName = focused ? 'briefcase-sharp' : 'briefcase-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            
          })}
        >
                <Tab.Screen name='Projects' component={Projects} />
                <Tab.Screen name='Home' component={Dashboard} />
                <Tab.Screen name='Explore' component={SearchView} />
        </Tab.Navigator>
    )
}

const CustomDrawerContent= (props) => {
const { state, authContext } = useAuthContext();
const {username, email} = state;

return (
    <View style={{
            flex: 1
        }}>
        <DrawerContentScrollView {...props}>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding:20,
                    backgroundColor: "#f6f6f6",
                    marginBottom: 20
                }}>
                <View>
                    <Text>
                            {username}
                    </Text>
                    <Text>
                            {email}
                    </Text>
                </View>
                <View style={{
                        backgroundColor:'#66bce8',
                        borderRadius:30,
                        width: 50,
                        height:50,
                        alignItems: 'center',
                        justifyContent:'center'
                    }}>
                        <Text style={{
                            fontSize:28,
                            fontWeight: "600",
                            color:'white'
                        }}>
                            {username[0].toUpperCase()}
                        </Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity 
            onPress={() => authContext.signOut()}
            style={{
                position:'absolute',
                bottom:25,
                left:0,
                right:0,
                padding: 20,
                backgroundColor: "#f6f6f6",
            }}>
            <Text style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 16,
                fontWeight: "600"
            }}>
                Logout
            </Text>
        </TouchableOpacity>
    </View>
    );
  }
  
const Navigator = () => {
const { state } = useAuthContext();
const { isLoggedIn } = state;

  return (
        <NavigationContainer>
          {isLoggedIn ?
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name='Dashboard' component={TabNav} />
                <Drawer.Screen name='Settings' component={TabNav} />

            </Drawer.Navigator>
            :
            <Stack.Navigator>
                <Stack.Screen name='Login' options={{
                    headerShown:false
                }} component={Login} />
            </Stack.Navigator>
          }
        </NavigationContainer>
  );
}

export default Navigator;