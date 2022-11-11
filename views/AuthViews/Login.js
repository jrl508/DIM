import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Login = () => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);

    const getValueFor = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert('No values stored under that key.');
        }
      }

    const submitLogin = async () => {
        const response = await fetch('http://10.0.0.109:3005/user/login', {
            method:'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            const payload = res.json()
            return payload;
        }).catch(err => {
            return console.error(err);
        })
        if(response.error) {
            setError(response.message)
        } else if (response.message === "Success") {
            setError(null);
            const t = response.token.split(" ")[1]
            await SecureStore.setItemAsync("token", t);
        }
    }

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
                <TouchableOpacity onPress={() => submitLogin()} style= {styles.button}>
                    <Text style={styles.button_text}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text>
                    {error}
                </Text>
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
    padding: 12,
    borderRadius: 5,
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