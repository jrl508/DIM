import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


TouchableOpacity.defaultProps = {activeOpacity: 0.7}

const CustomButton = ({title, action}) => {
    return (
        <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={action}
        >
            <Text style={styles.buttonTextStyle}>
                {title}
            </Text>
        </TouchableOpacity>          
    )
}

export default CustomButton;

const styles = StyleSheet.create({

    buttonStyle: {
        height: '100%', 
        justifyContent:'center'
    },

    buttonTextStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    }

  });