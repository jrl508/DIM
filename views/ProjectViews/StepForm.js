import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const StepForm = () => {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  return (
    <ScrollView>
      {photo ? (
        <View style={{ height: 250, width: "100%", paddingBottom: 10 }}>
          <Image
            source={{ uri: photo }}
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
          />
        </View>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Summary"
        value={summary}
        onChangeText={setSummary}
      />

      <TextInput
        textAlignVertical="top"
        value={details}
        onChangeText={setDetails}
        multiline
        numberOfLines={10}
        minHeight={Platform.OS === "ios" ? 150 : null}
        style={styles.input}
        placeholder="Enter Details Here..."
      />

      <TouchableOpacity
        onPress={pickImage}
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
          Add Photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("push step to form state")}
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
          Save Step
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 4,
    borderColor: "#cecece",
  },
});

export default StepForm;
