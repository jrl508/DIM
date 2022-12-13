import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { useAuthContext } from "../providers/AuthProvider";
import { useProjectContext } from "../providers/ProjectProvider";

const Dashboard = ({ navigation }) => {
  const [ready, setReady] = useState(false);
  const { state: authState } = useAuthContext();
  const { state: projectState, projectContext } = useProjectContext();
  const { getProjectsByUser } = projectContext;

  const { id } = authState;
  const { projects } = projectState;

  useEffect(() => {
    if (!ready) {
      Promise.all([getProjectsByUser(id)]).then(() => {
        setReady(true);
      });
    }
  }, [ready]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 8,
          minHeight: 200,
        }}
      >
        <View
          style={{
            padding: 8,
          }}
        >
          <Text>My Workbench</Text>
        </View>
        <View
          className="project-list"
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "lightgrey",
            padding: 8,
            minHeight: 120,
            justifyContent: !ready ? "center" : null,
          }}
        >
          {!ready ? (
            <ActivityIndicator />
          ) : (
            <View>
              {projects.length > 0 ? (
                projects.map((proj) => {
                  return (
                    <View key={proj._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Projects", {
                            screen: "EditProject",
                            params: {
                              ...proj,
                            },
                          })
                        }
                      >
                        <Text>{proj.title}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>You have no projects</Text>
              )}
            </View>
          )}
        </View>
        <View
          style={{
            padding: 8,
          }}
        >
          <TouchableOpacity
            disabled={!ready}
            style={{ alignItems: "center" }}
            onPress={() =>
              navigation.navigate("Projects", { screen: "NewProject" })
            }
          >
            <Text>Start A New Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkgrey",
  },
});

export default Dashboard;
