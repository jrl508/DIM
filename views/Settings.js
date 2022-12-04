import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>
        View Your Settings Here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
});

export default Settings;