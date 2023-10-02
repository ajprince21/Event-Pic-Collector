import axios from 'axios';
import { store } from '../store';

const BASE_URL = 'https://genuinemark.org/piccollect';



export const registerUser = async ({ name, email, password }) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(`${BASE_URL}/user/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(`${BASE_URL}/user/login`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadPicture = async (tags, image) => {
    const userData = store.getState().auth.userData;
    try {
        const formData = new FormData();
        formData.append('tags', tags);
        formData.append('image', {
            uri: image.uri,
            name: image.fileName,
            filename: image.fileName,
            type: image.type
        });

        const response = await axios.post(`${BASE_URL}/picture/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Token': userData.auth_token,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPictureList = async () => {
    const userData = store.getState().auth.userData;
    try {
        const response = await axios.get(`${BASE_URL}/picture/listAll`, {
            headers: {
                'Token': userData.auth_token,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
