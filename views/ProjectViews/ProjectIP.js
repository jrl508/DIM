import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import Select from "../../components/Select";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../../providers/AuthProvider";

const typeData = [
  {
    title: "Automotive",
    id: 1,
  },
  {
    title: "Home Improvement",
    id: 2,
  },
  {
    title: "Electrical",
    id: 3,
  },
  {
    title: "Plumbing",
    id: 4,
  },
];

const ProjectIP = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState(null);
  const [supplies, setSupplies] = useState([""]);
  const { state } = useAuthContext();
  const { id } = state;

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      type: projectType.title,
      supplies,
      user: id,
    };

    await fetch("http://10.0.0.165:3005/project/create", {
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
        <Select data={typeData} onSelect={setProjectType} />
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
        <Button title="Submit" onPress={handleSubmit} />
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

export default ProjectIP;
