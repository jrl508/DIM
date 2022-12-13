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
} from "react-native";
import Select from "../../components/Select";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../../providers/AuthProvider";
import { useProjectContext } from "../../providers/ProjectProvider";

const typeData = ["Automotive", "Home Improvement", "Electrical", "Plumbing"];

const ProjectForm = ({ route, navigation, initialValues, handleSubmit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [projectType, setProjectType] = useState(initialValues.type);
  const [supplies, setSupplies] = useState(initialValues.supplies);
  const { projectContext } = useProjectContext();
  const { state } = useAuthContext();
  const { getProjectsByUser } = projectContext;
  const { id } = state;

  const initProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setProjectType(project.type);
    setSupplies(project.supplies);
  };

  const payload = {
    title,
    description,
    type: projectType,
    supplies,
    user: id,
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
        <Text>Project Details</Text>
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
          <View style={styles.supply_header}>
            <Text>Supply List</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setSupplies([...supplies, ""])}>
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

        <TouchableOpacity onPress={() => handlePress(payload)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>Add Step</Text>
            <Ionicons name="arrow-forward" size={20} />
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
  supply_header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  scroll_view: {
    paddingHorizontal: 15,
  },
});

export default ProjectForm;
