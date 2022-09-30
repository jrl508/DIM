import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card buttonText={"View Projects ->"} target={"Projects"} navigation={navigation}>
        <Text>
          List Existing User Projects Here
        </Text>
      </Card>
      <Card buttonText={"Search Projects ->"} target={"Explore"} navigation={navigation}>
        <Text>
          Search Projects
        </Text>
      </Card>
      <Card buttonText={"+ Add Reminder"} navigation={navigation}>
        <Text>
          Reminders
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
});

export default Dashboard;