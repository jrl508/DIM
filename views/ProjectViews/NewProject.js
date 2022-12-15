import React from "react";
import ProjectForm from "./ProjectForm";
import { BACKEND_URL } from "@env";

const NewProject = ({ navigation }) => {
  const initialVal = {
    title: "",
    description: "",
    type: "",
    supplies: [""],
    steps: [],
  };

  const handleSubmit = async (payload) => {
    await fetch(`${BACKEND_URL}/projects/create`, {
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
      initialValues={initialVal}
      handleSubmit={handleSubmit}
    />
  );
};

export default NewProject;
