import { StyleSheet, Text, View, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import Select from '../../components/Select';

const typeData = [
    {
        title: 'Automotive',
        id: 1,
    },
    {
        title: 'Home Improvement',
        id: 2,
    },
    {
        title: 'Electrical',
        id: 3,
    },
    {
        title: 'Plumbing',
        id: 4,
    },
 
]

const ProjectIP = () => {
  return (
    <KeyboardAvoidingView behavior='position' style={styles.container}>
        <Text>Project Details</Text>
        <TextInput style={styles.input} placeholder='Project Title' />
        <TextInput textAlignVertical='top'
            multiline
            numberOfLines={5}
            minHeight={Platform.OS === 'ios' ? 90 : null}
            style={styles.input} 
            placeholder='Project Description'
            />
        <Select data={typeData} />
        {/* <TextInput style={styles.input} placeholder='Project Type' /> */}
        <View>
          <Text>Supply List</Text>
        </View>
        <TextInput style={styles.input} placeholder='Item' />
        <TextInput style={styles.input} placeholder='Item' />
        <TextInput style={styles.input} placeholder='Item' />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    borderRadius: 4,
    borderColor: '#cecece'
  },
});

export default ProjectIP;