import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import ProjectForm from "./ProjectForm";
import { BACKEND_URL } from "@env";

const NewProject = ({ navigation }) => {
  const { state } = useAuthContext();
  const { id } = state;
  const initialVal = {
    title: "",
    description: "",
    type: "",
    supplies: [""],
  };

  const handleSubmit = async (payload) => {
    console.log("called");
    console.log(payload);
    await fetch(`${BACKEND_URL}/projects/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
      .then(async (res) => {
        console.log("THEN");
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
