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
            isLoading: true,
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
            loggingIn: false,
            error: {}
          };
  
        case 'LOGIN_FAIL':
          return {
            ...prevState,
            isLoading: false,
            loggingIn: false,
            error: {
              type: 'login',
              message: action.error,
            }
          }
          ;
        case 'LOGOUT':
          return {
            ...prevState,
            token: null,
            isLoggedIn: false,
          };
        case 'REGISTER_POST':
          return {
            ...prevState,
            isLoading: true
          }
        case 'REGISTER_SUCCESS':

            return {
              ...prevState,
              isLoading: false,
              loggingIn: true
            }
        case 'REGISTER_FAIL':
            return {
                ...prevState,
                isLoading: false,
                error: {
                  type: 'register',
                  message: action.error,
                }
            }
      }
    },
    {
      username: null,
      email: null,
      token: null,
      isLoading: false,
      isLoggedIn: false,
      loggingIn: false,
      error: {}
    }
  );
  
  
  const authContext = React.useMemo(
      () => ({
        signIn: async (credentials) => {
          const {username, password} = credentials;
          const lcun = username.toLowerCase();
          dispatch({
              type: 'LOGIN_POST',
            });
              await fetch('http://10.0.0.109:3005/user/login', {
              method:'POST',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  username: lcun,
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
                    ...data
                  })
                }
              })
              .catch(error => {
                dispatch({
                  type: 'LOGIN_FAIL',
                  payload: error,
                });
              });
        },
        signOut: async () => {
          dispatch({type:"LOGOUT"});
          if(Platform.OS === 'web') {
            localStorage.removeItem("token");
          } else {
              await SecureStore.deleteItemAsync("token");
          }
        },
        register: async (credentials) => {
          const {email, username, password} = credentials;
          dispatch({type: 'REGISTER_POST'});
          const result = await fetch('http://10.0.0.109:3005/user/register', {
            method:'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password
            })
            })
            .then(async res => {
              const data = await res.json();
              if(res.status === 201) {
                dispatch({type: "REGISTER_SUCCESS"});
              } else {
                dispatch({type: "REGISTER_FAIL", ...data});
              }
            })
            .catch(error => {
              dispatch({type: "REGISTER_FAIL", payload: error});
            })
            return result;
        }
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


