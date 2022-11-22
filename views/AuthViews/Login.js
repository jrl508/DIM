import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform, Button, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const [registerMode, setRegisterMode] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const { state, authContext } = useAuthContext();
    const { signIn, register } = authContext;
    const {loggingIn, error} = state;

    console.log(state)

    const handleSubmit = () => {
        if(registerMode) {
            register({email,username,password});
        } else {
            signIn({username, password});
        }
    }
    
    React.useEffect(() => {
        if(loggingIn){
            signIn({username, password})
        }
    },[loggingIn])

    return (
        <View style={styles.container}>
            <View style={styles.login_box}>
                <Text style={{
                    textAlign:'center',
                    fontSize: 20,
                    marginBottom: 18,
                    fontWeight: '600'
                    }}>
                    {registerMode ? "Sign Up" : "Login"}
                </Text>
                {registerMode && (
                    <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={setEmail}
                    value={email}
                />
                )}
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
                {!registerMode && !!error.type && error.type === 'login' && (
                    <Text style={{
                        textAlign: 'center',
                        color:'red',
                        marginBottom: 10
                        }}>
                        {error.message}
                    </Text>
                    )}
                {registerMode && (
                    <TextInput
                    secureTextEntry 
                    style={styles.input}
                    placeholder='Confirm Password'
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                )}
                <View style={{
                    marginBottom: 18,
                    flexDirection: 'row',
                    justifyContent:'space-between'
                }}>
                    <Text>
                        {registerMode ? "Already have an account?" : "Don't have an account?"} 
                    </Text>
                    <Text 
                        onPress={() => setRegisterMode(!registerMode)}
                        style={{
                        color: '#66bce8',
                        fontWeight: "600",
                    }}>
                       {registerMode ? "Sign In": "Sign Up"}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => handleSubmit()} style= {styles.button}>
                    <Text style={styles.button_text}>
                        {registerMode ? "Submit" : "Login"}
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