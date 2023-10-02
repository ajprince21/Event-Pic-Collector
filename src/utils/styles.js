import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'#ffffff'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color:'#808080',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    textInput:{
        marginVertical:10
    },
    errorText:{
        color:'red',

    }
});

export default globalStyles;
