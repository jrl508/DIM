import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor:'white',
        marginTop: 8,
      }}>
        <View style={{
          padding: 8
        }}>
          <Text>
            My Workbench
          </Text>
        </View>
        <View className='project-list' style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'lightgrey' ,
          padding: 8,
          minHeight: 100
        }}>
          <Text>
            You have no projects
          </Text>
        </View>
        <View style={{
          padding: 8,
        }}>
          <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate("Projects", {screen:'ProjectIP'})}>
            <Text>
              Start A New Project
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'darkgrey',
  },
});

export default Dashboard;