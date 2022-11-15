import React from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext();



const AuthProvider = (props) => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'LOGIN_POST':
          console.log('LOGIN POST')
          return {
            ...prevState,
            isLoading: true
          }
  
        ;
        case 'LOGIN_SUCCESS':
          console.log('LOGIN SUCCESS')

          return {
            ...prevState,
            isLoading: false,
            isLoggedIn: true,
            token: action.token,
            username: action.username,
            email: action.email,
          };
  
        case 'LOGIN_FAIL':
          console.log('LOGIN FAIL')

          return {
            ...prevState,
            isLoading: false,
            error: action.error
          }
          ;
        case 'LOGOUT':
          return {
            ...prevState,
            token: null,
            isLoggedIn: false,
          };
      }
    },
    {
      username: null,
      email: null,
      token: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
    }
  );
  
  
  const authContext = React.useMemo(
      () => ({
        signIn: async ( username, password ) => {
          console.log('action called')
  
          dispatch({
              type: 'LOGIN_POST',
            });
            const result = await fetch('http://10.0.0.109:3005/user/login', {
              method:'POST',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  username,
                  password
              })
              })
              .then(async res => {
                const data = await res.json();
                if(res.status === 200) {
                  dispatch({
                    type: 'LOGIN_SUCCESS',
                    ...data
                  });
                  if(Platform.OS === 'web') {
                    localStorage.setItem("token", data.token);
                  } else {
                      await SecureStore.setItemAsync("token", data.token);
                  }
                } else{
                  dispatch({
                    type: 'LOGIN_FAIL',
                    payload: data
                  })
                }
              })
              .catch(error => {
                console.log('caught errror', error)
                dispatch({
                  type: 'LOGIN_FAILURE',
                  payload: error,
                });
              });


              // dispatch({
              //   type: 'LOGIN_SUCCESS',
              //   payload: res.json(),
              // });
              
        },
       // signOut: () => dispatch({ type: 'SIGN_OUT' }),
        // signUp: async (data) => {
        //   // In a production app, we need to send user data to server and get a token
        //   // We will also need to handle errors if sign up failed
        //   // After getting token, we need to persist the token using `SecureStore`
        //   // In the example, we'll use a dummy token
  
        //   dispatch({ type: 'SIGN_IN', payload: res.json() });
        // },
      }),
      []
  );

  return (
    <AuthContext.Provider value={{state, authContext}}  {...props} />
  );
}

const useAuthContext = () => {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuthContext };


