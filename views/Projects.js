import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

const Projects = () => {
  return (
    <View style={styles.container}>
      <Text>
        View Your Projects Here
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

export default Projects;