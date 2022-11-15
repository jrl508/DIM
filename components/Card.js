import {StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';

const Card = ({children, buttonText, navigation, target}) => {
    return (
        <View style={styles.container}>
            <View style={styles.upper}>
                {children}
            </View>
            <View style={styles.lower}>
                <CustomButton 
                    style={styles.buttonStyle}
                    title={buttonText}
                    action={() => navigation.navigate(target)}
                />
            </View>

        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        borderWidth: 2,
        backgroundColor: "#dbdbdb",
        overflow: 'hidden',
        borderRadius: 8,
    },
    upper: {
        flex: .75,
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: "white",

    },
    lower: {
        flex: 0.25,
        padding: 5,
    },
    buttonStyle: {
        fontWeight: 'bold',
        fontSize: 15
    }
  });