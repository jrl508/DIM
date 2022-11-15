import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerProgress,
 } from '@react-navigation/drawer';
import Dashboard from '../views/Dashboard';
import SearchView from '../views/SearchView';
import Projects from '../views/Projects';
import Login from '../views/AuthViews/Login';
import {useAuthContext } from '../providers/AuthProvider';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const StackNav = () => {

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Home' component={Dashboard} />
                <Stack.Screen name='Explore' component={SearchView} />
                <Stack.Screen name='Projects' component={Projects} />
            </Stack.Group>
        </Stack.Navigator>
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
                <Drawer.Screen name='Dashboard' component={StackNav} />
                <Drawer.Screen name='Settings' component={StackNav} />

            </Drawer.Navigator>
            :
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} />
            </Stack.Navigator>
          }
        </NavigationContainer>
  );
}

export default Navigator;