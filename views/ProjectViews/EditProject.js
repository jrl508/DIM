import React from "react";
import ProjectForm from "./ProjectForm";

const EditProject = ({ route, navigation }) => {
  const { params } = route;

  const handleSubmit = async ({ payload }) => {
    await fetch("http://10.0.0.109:3005/project/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then(async (res) => {
        res.status === 201 && console.log(await res.json());
      })
      .catch((err) => console.log("Error!!! : ", err));
  };
  return (
    <ProjectForm
      navigation={navigation}
      initialValues={params}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditProject;
