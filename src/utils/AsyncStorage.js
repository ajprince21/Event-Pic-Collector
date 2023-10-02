import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data in AsyncStorage
export const storeData = async (data) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

// Function to retrieve data from AsyncStorage
export const getUserDataFromAsyncStorage = async () => {
    try {
        const data = await AsyncStorage.getItem('userData');
        if (data !== null) {
            // Data found, parse it and return
            return JSON.parse(data);
        } else {
            // No data found
            return null;
        }
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
};

// Function to remove data from AsyncStorage
export const removeData = async () => {
    try {
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Error removing data:', error);
    }
};


