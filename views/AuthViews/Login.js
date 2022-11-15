import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform, Button, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../providers/AuthProvider';
import * as SecureStore from 'expo-secure-store';


const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { authContext } = useAuthContext();

    return (
        <View style={styles.container}>
            <View style={styles.login_box}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={setUsername}
                    value={username}
                /> 
                <TextInput
                    secureTextEntry 
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity onPress={() => authContext.signIn(username,password)} style= {styles.button}>
                    <Text style={styles.button_text}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#66bce8',
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 4,
    borderColor: '#cecece'
  },
  login_box: {
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    justifyContent:'center',
    padding: 12,
    borderRadius: 5,
    minWidth:Platform.OS === 'web' ? 500 : null,
    height: Platform.OS === 'web' ? 300 : null,
  },
  button: {
    backgroundColor:'#66bce8',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 10,
  },
  button_text: {
    color: 'white',
    fontSize: 18
  }

});

export default Login;