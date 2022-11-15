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
          return {
            ...prevState,
            isLoading: true
          }
  
        ;
        case 'LOGIN_SUCCESS':
          return {
            ...prevState,
            isLoading: false,
            isLoggedIn: true,
            token: action.token,
            username: action.username,
            email: action.email,
          };
  
        case 'LOGIN_FAIL':
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
        },
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


