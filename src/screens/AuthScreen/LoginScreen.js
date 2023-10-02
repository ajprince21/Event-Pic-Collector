import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import globalStyles from '../../utils/styles';
import { loginUser } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../../utils/AsyncStorage';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/slice/AuthSlice';

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    // Define memoized functions
    const validateEmail = useMemo(() => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return () => {
            if (!emailRegex.test(email)) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        };
    }, [email]);

    const handleLogin = useCallback(async () => {
        // Validate email
        validateEmail();

        // Check if the email is valid and password is not empty
        if (!emailError && password) {
            // Set loading state to true during login request
            setLoading(true);

            try {
                const response = await loginUser({ email, password });
                if (response.status == 200) {
                    // Store user data in AsyncStorage
                    await storeData(response.data);
                    dispatch(setUserData(response.data))
                    setLoginError('');
                } else {
                    setLoginError(response.message || 'Login failed');
                }
            } catch (error) {
                // Handle other errors, such as network issues
                setLoginError(error.message || 'Login failed');
            } finally {
                // Set loading state to false after login request is complete
                setLoading(false);
            }
        }
    }, [email, password, validateEmail, emailError]);


    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.heading}>Login</Text>
            {emailError && <Text style={globalStyles.errorText}>{emailError}</Text>}
            <TextInput
                style={globalStyles.textInput}
                mode='outlined'
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            {loginError && <Text style={globalStyles.errorText}>{loginError}</Text>}
            <TextInput
                style={globalStyles.textInput}
                mode='outlined'
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <View>
                <Button
                    mode="contained"
                    buttonColor='tomato'
                    onPress={handleLogin}
                    labelStyle={{ fontSize: 16 }}
                    textColor="#ffffff"
                    style={{ marginVertical: 15 }}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={{ textAlign: 'center' }}>Don't have Account ? Sign UP </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
