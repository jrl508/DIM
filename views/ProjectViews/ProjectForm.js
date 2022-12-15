import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import Select from "../../components/Select";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../../providers/AuthProvider";
import { useProjectContext } from "../../providers/ProjectProvider";
import StepForm from "./StepForm";
import { BACKEND_URL } from "@env";

const typeData = ["Automotive", "Home Improvement", "Electrical", "Plumbing"];

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const ProjectForm = ({ route, navigation, initialValues, handleSubmit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [projectType, setProjectType] = useState(initialValues.type);
  const [supplies, setSupplies] = useState(initialValues.supplies);
  const [steps, setSteps] = useState(initialValues.steps);
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const { projectContext } = useProjectContext();
  const { state } = useAuthContext();
  const { getProjectsByUser } = projectContext;
  const { id } = state;

  const initProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setProjectType(project.type);
    setSupplies(project.supplies);
    setSteps(project.steps);
  };

  const payload = {
    title,
    description,
    type: projectType,
    supplies,
    user: id,
  };

  const handleUploadPhoto = (photo) => {
    fetch(`${BACKEND_URL}/api/upload`, {
      method: "POST",
      body: createFormData(photo, { userId: id }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handlePress = async (payload) => {
    await handleSubmit(payload)
      .then(() => {
        getProjectsByUser(id);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      initProject(initialValues);
    });
  }, [initialValues]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll_view}>
        <Text style={{ fontSize: 15, fontWeight: "600", marginVertical: 15 }}>
          Project Details
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Project Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          minHeight={Platform.OS === "ios" ? 90 : null}
          style={styles.input}
          placeholder="Project Description"
        />
        <Select
          data={typeData}
          initialVal={projectType}
          onSelect={setProjectType}
        />
        <View style={styles.supply_container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>Supply List</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => setSupplies([...supplies, ""])}
              >
                <Ionicons name="add" size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSupplies(supplies.slice(0, -1));
                }}
              >
                <Ionicons name="remove" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          {supplies.map((x, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder="Item"
              value={supplies[index]}
              onChange={(event) => {
                const { text } = event.nativeEvent;
                const newSupplies = [...supplies];
                newSupplies[index] = text;
                setSupplies(newSupplies);
              }}
            />
          ))}
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 15, fontWeight: "600", marginVertical: 15 }}>
            Steps
          </Text>
          <TouchableOpacity onPress={() => setStepModalOpen(true)}>
            <Ionicons name="add" size={25} />
          </TouchableOpacity>
        </View>
        <Modal visible={stepModalOpen} animationType="slide">
          <SafeAreaView>
            <View style={{ paddingVertical: 25, paddingHorizontal: 10 }}>
              <View style={styles.header}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Step {steps.length + 1}
                </Text>
                <Ionicons
                  name="close"
                  size={25}
                  onPress={() => setStepModalOpen(false)}
                />
              </View>

              <StepForm />
            </View>
          </SafeAreaView>
        </Modal>
        <TouchableOpacity
          style={{
            marginTop: 40,
          }}
          onPress={() => handlePress(payload)}
        >
          <View
            style={{
              backgroundColor: "#66bce8",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
              Save Project
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 4,
    borderColor: "#cecece",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  scroll_view: {
    paddingHorizontal: 15,
  },
});

export default ProjectForm;
