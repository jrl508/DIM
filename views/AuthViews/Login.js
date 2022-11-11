import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

const Login = () => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);


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
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity style= {styles.button}>
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
    backgroundColor: 'white',
    justifyContent:'center',
    height: 250,
    padding: 12,
    borderRadius: 5,
  },
  button: {
    backgroundColor:'#66bce8',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  button_text: {
    color: 'white',
    fontSize: 18
  }

});

export default Login;