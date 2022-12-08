import React, { createContext, useReducer } from "react";

const ProjectProvider = (props) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "CREATE_PROJECT_POST":
          return {
            ...prevState,
            loading: true,
          };
        case "CREATE_PROJECT_SUCCESS":
          return {
            ...prevState,
            loading: false,
          };
        case "CREATE_PROJECT_FAIL":
          return {
            ...prevState,
            loading: false,
          };
      }
    },
    {
      loading: false,
    }
  );
};
