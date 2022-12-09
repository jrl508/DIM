import React, { createContext, useReducer, useMemo, useContext } from "react";

const ProjectContext = createContext();

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
        case "FIND_USER_PROJECTS_GET":
          return {
            ...prevState,
            loading: true,
          };
        case "FIND_USER_PROJECTS_SUCCESS":
          return {
            ...prevState,
            projects: action.projects,
            loading: false,
          };
        case "FIND_USER_PROJECTS_FAIL":
          return {
            ...prevState,
            loading: false,
          };
      }
    },
    {
      loading: false,
      projects: [],
    }
  );

  const projectContext = useMemo(
    () => ({
      getProjectsByUser: async (userId) => {
        dispatch({
          type: "FIND_USER_PROJECTS_GET",
        });
        await fetch(`http://10.0.0.165:3005/projects/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then(async (res) => {
            const data = await res.json();
            if (res.status === 200) {
              dispatch({
                type: "FIND_USER_PROJECTS_SUCCESS",
                ...data,
              });
            }
          })
          .catch((error) => {
            dispatch({ type: "FIND_USER_PROJECTS_FAIL" });
            console.log(error);
          });
      },
    }),
    []
  );

  return (
    <ProjectContext.Provider value={{ state, projectContext }} {...props} />
  );
};

const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { ProjectProvider, useProjectContext };
